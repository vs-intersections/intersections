import addChildNode from "./addChildNode"

const MAIN_NODE_SIZE = 15
export const CHILD_NODE_SIZE = 15
export const DEFAULT_DISTANCE = 60
const MAIN_NODE_DISTANCE = 150
const CHILD_NODE_DISTANCE = 20
let artists = []
let artwork = []
let artistsTempNodes = []

export const linkGenerator = (
  data,
  selectedFilter = null,
  nodes = [],
  links = []
) => {
  // reinitialize these arrays to empty
  artists = []
  artwork = []
  artistsTempNodes = []

  // function to create parent nodes
  const addMainNode = node => {
    node.size = node.isParent ? MAIN_NODE_SIZE * 1.35 : MAIN_NODE_SIZE
    node.color = "#A3F78E"
    nodes.push(node)
    // to interate over later and grab the D3 properties (color, etc)
    artistsTempNodes.push(node)
  }

  // function to assemble child nodes before calling addChildNode
  const assembleChildNode = (parentNode, artwork) => {
    let childNode = {
      id: artwork.recordId,
      name: artwork.data.Name,
      collaborators: artwork.data?.Collaborators || null,
      locations: artwork.data.Locations,
      medium: artwork.data.Medium,
      theme: artwork.data.Theme,
      size: CHILD_NODE_SIZE,
    }

    if (selectedFilter.filterName === artwork.recordId) {
      childNode.fill = "white"
    }

    if (selectedFilter.filterName === artwork.recordId) {
      addChildNode(
        links,
        nodes,
        parentNode,
        childNode,
        CHILD_NODE_DISTANCE,
        true,
        selectedFilter
      )
    } else {
      addChildNode(
        links,
        nodes,
        parentNode,
        childNode,
        CHILD_NODE_DISTANCE,
        false,
        selectedFilter
      )
    }
  }

  // function to create default node links
  const linkMainNodesDefault = (
    source,
    target,
    color = "#c7c7c7",
    strokeWidth = 1
  ) => {
    links.push({
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
        artistB.id === selectedFilter.filterName &&
        artwork[x].data.Primary_Artist__REQUIRED_[0] ===
          selectedFilter.filterName &&
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

  // create child nodes
  const createChildNodes = (artworkArray, parentNodeId, parentNode) => {
    artworkArray.forEach(artwork => {
      if (
        artwork.data.Name !== undefined &&
        artwork.data.Primary_Artist__REQUIRED_[0] === parentNodeId
      ) {
        assembleChildNode(parentNode, artwork)
      }
    })
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
      // adds property when selectedFilter is a specific artist
      if (parentNodeId === selectedFilter.filterName) {
        parentNode.isParent = true
        parentNode.fill = "white"
      }

      addMainNode(parentNode)

      createChildNodes(artworkArray, parentNodeId, parentNode)
    })
  }

  const linkParentNodes = artistsArray => {
    // links every artist to each artist
    artistsArray.forEach((artistA, i) => {
      artistsArray.slice(i + 1).forEach(artistB => {
        // checks to see if there is a filtered selection
        if (
          selectedFilter.filterName === artistA.id ||
          selectedFilter.filterName === artistB.id
        ) {
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

    return nodes
  }

  const populatedDefaultNodes = () => {
    const res = populateArrays()
    return { nodes: res, links }
  }

  return populatedDefaultNodes()
}
