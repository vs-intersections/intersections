// import { useArtist, useArtwork } from '../hooks'
import { scaleLinear } from "d3"

const MAIN_NODE_SIZE = 15
const CHILD_NODE_SIZE = 15
const DEFAULT_DISTANCE = 60
const MAIN_NODE_DISTANCE = 150
const CHILD_NODE_DISTANCE = 40
let artists = []
let artwork = []
const nodes = []
const links = []
let artistsTempNodes = []

export const linkGenerator = () => {
  // for default node links, this function needs to query artists and artwork
  // it then populates React state with the artists as parent nodes, - may need to use useContext
  // and artwork as child nodes
  // it then links parents to each other
  // and links parents to their associated artwork

  // create color scale for nodes
  const colorScale = scaleLinear() /* the color domain needs to be based off of the artist array length */
    .domain([0, 8])
    .range(["#24afff", "#c6ff0c"])

  // function to create parent nodes
  const addMainNode = (node, index) => {
    node.size = MAIN_NODE_SIZE
    node.color = colorScale(index)
    nodes.push(node)
    // to interate over later and grab the D3 properties (color, etc)
    artistsTempNodes.push(node)
  }

  // function to create child nodes
  const addChildNode = (
    parentNode,
    childNode,
    size = CHILD_NODE_SIZE,
    distance = DEFAULT_DISTANCE
  ) => {
    childNode.size = size
    childNode.color = parentNode.color
    nodes.push(childNode)

    links.push({
      source: parentNode,
      target: childNode,
      distance: distance,
      color: parentNode.color,
    })
  }

  // function to create child nodes by calling the above function
  const assembleChildNode = (parentNode, id) => {
    let childNode = { id }
    addChildNode(parentNode, childNode, CHILD_NODE_SIZE, CHILD_NODE_DISTANCE)
  }

  // function to link nodes
  const linkMainNodes = (source, target) => {
    links.push({
      source,
      target,
      distance: MAIN_NODE_DISTANCE,
      color: source.color,
    })
  }

  // create parent nodes
  const createParentNodes = (artistsArray, artworkArray) => {
    artistsArray.forEach((artist, i) => {
      const parentNodeId = artist.id
      const parentNode = { id: artist.id, name: artist.fields.Name }
      addMainNode(parentNode, i)

      // create child nodes
      artworkArray.forEach(artwork => {
        if (
          artwork.fields.Name !== undefined &&
          artwork.fields["Primary Artist (REQUIRED)"][0] == parentNodeId
        ) {
          assembleChildNode(parentNode, artwork.fields.Name)
        }
      })
    })
  }

  const linkParentNodes = artistsArray => {
    artistsArray.forEach((artistA, i) => {
      artistsArray.slice(i + 1).forEach(artistB => {
        linkMainNodes(artistA, artistB)
      })
    })
  }

  const populateArrays = async () => {
    const artistData = await useArtist()
    // spreading the array to concatenate the data (else, array of arrays)
    artists.push(...artistData)

    const artworkData = await useArtwork()
    artwork.push(...artworkData)

    createParentNodes(artists, artwork)
    linkParentNodes(artistsTempNodes)
    return nodes
  }

  const populatedNodes = async () => {
    const res = await populateArrays()
    return { nodes: res, links }
  }

  return populatedNodes()
}
