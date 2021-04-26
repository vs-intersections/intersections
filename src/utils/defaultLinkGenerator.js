import { scaleLinear } from "d3"

const MAIN_NODE_SIZE = 15
const CHILD_NODE_SIZE = 15
const DEFAULT_DISTANCE = 60
const MAIN_NODE_DISTANCE = 150
const CHILD_NODE_DISTANCE = 20

export const defaultLinkGenerator = (data, selectedFilter = null) => {
  let artists = []
  let artwork = []
  let nodes = []
  let links = []
  let artistsTempNodes = []
  // for default node links, this function needs to query artists and artwork
  // it then populates React state with the artists as parent nodes, - may need to use useContext
  // and artwork as child nodes
  // it then links parents to each other
  // and links parents to their associated artwork

  // create color scale for nodes
  // const colorScale = scaleLinear() /* the color domain needs to be based off of the artist array length */
  //   .domain([0, 8])
  //   .range(["#24afff", "#c6ff0c"])

  // function to create parent nodes
  const addMainNode = node => {
    node.size = MAIN_NODE_SIZE
    node.color = "#A3F78E"
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
    childNode.color = "#FF985F"
    nodes.push(childNode)

    links.push({
      source: parentNode,
      target: childNode,
      distance: distance,
    })
  }

  // function to create child nodes by calling the above function
  const assembleChildNode = (parentNode, artwork) => {
    let childNode = {
      id: artwork.recordId,
      name: artwork.data.Name,
      collaborators: artwork.data?.Collaborators || null,
    }
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
    artistsArray.forEach(artist => {
      const parentNodeId = artist.recordId
      const parentNode = { id: artist.recordId, name: artist.data.Name }
      addMainNode(parentNode)

      // create child nodes
      artworkArray.forEach(artwork => {
        if (
          artwork.data.Name !== undefined &&
          artwork.data.Primary_Artist__REQUIRED_[0] === parentNodeId
        ) {
          assembleChildNode(parentNode, artwork)
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

  const populateArrays = () => {
    // spreading the array to concatenate the data (else, array of arrays)
    artists.push(...data.artists.nodes)
    artwork.push(...data.artwork.nodes)
    createParentNodes(artists, artwork)
    linkParentNodes(artistsTempNodes)
    return nodes
  }

  const populatedNodes = () => {
    const res = populateArrays()
    console.log(res) // LEFT OFF HERE - why does this create a bigger array on click?
    return { nodes: res, links }
  }

  return populatedNodes()
}
