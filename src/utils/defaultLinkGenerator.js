import { scaleLinear, select } from "d3"

const MAIN_NODE_SIZE = 15
const CHILD_NODE_SIZE = 15
const DEFAULT_DISTANCE = 60
const MAIN_NODE_DISTANCE = 150
const CHILD_NODE_DISTANCE = 20

export const defaultLinkGenerator = (data, selectedFilter = null) => {
  let artists = []
  let artwork = []
  let defaultNodes = []
  let defaultLinks = []
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
    defaultNodes.push(node)
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
    defaultNodes.push(childNode)

    defaultLinks.push({
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
      locations: artwork.data.Locations,
      medium: artwork.data.Medium,
      theme: artwork.data.Theme,
    }
    addChildNode(parentNode, childNode, CHILD_NODE_SIZE, CHILD_NODE_DISTANCE)
  }

  // function to create default node links
  const linkMainNodesDefault = (
    source,
    target,
    color = "#c7c7c7",
    strokeWidth = 1
  ) => {
    defaultLinks.push({
      source,
      target,
      distance: MAIN_NODE_DISTANCE,
      color,
      strokeWidth,
    })
  }

  const linkMainNodesArtist = (artistA, artistB) => {
    let hasBeenInvoked = false
    for (let x = 0; x < artwork.length; x++) {
      if (
        artistB.id === selectedFilter &&
        artwork[x].data.Primary_Artist__REQUIRED_[0] === selectedFilter &&
        artwork[x].data.Collaborators !== null
      ) {
        for (let y = 0; y < artwork[x].data.Collaborators.length; y++) {
          if (artwork[x].data.Collaborators[y] === artistA.id) {
            hasBeenInvoked = true
            return linkMainNodesDefault(artistA, artistB, "#A3F78E", 5)
          }
        }
      }
    }
    if (!hasBeenInvoked) linkMainNodesDefault(artistA, artistB)
  }

  // create parent nodes
  const createParentNodes = (artistsArray, artworkArray) => {
    artistsArray.forEach(artist => {
      const parentNodeId = artist.recordId
      const parentNode = {
        id: artist.recordId,
        name: artist.data.Name,
        influence: artist.data.Influence,
      }
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
    // links every artist to each artist
    console.log(artistsArray)
    artistsArray.forEach((artistA, i) => {
      artistsArray.slice(i + 1).forEach(artistB => {
        // checks to see if there is a filtered selection
        if (selectedFilter === artistA.id || selectedFilter === artistB.id) {
          linkMainNodesArtist(artistA, artistB)
        } else {
          linkMainNodesDefault(artistA, artistB)
        }
      })
    })
  }

  const populateArrays = () => {
    // spreading the array to concatenate the data (else, array of arrays)
    artists.push(...data.artists.nodes)
    artwork.push(...data.artwork.nodes)
    createParentNodes(artists, artwork)
    linkParentNodes(artistsTempNodes)
    return defaultNodes
  }

  const populatedDefaultNodes = () => {
    const res = populateArrays()
    return { nodes: res, links: defaultLinks }
  }

  return populatedDefaultNodes()
}
