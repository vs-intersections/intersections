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
    node.size = node.isParent ? MAIN_NODE_SIZE * 1.35 : MAIN_NODE_SIZE
    node.color = "#A3F78E"
    defaultNodes.push(node)
    // to interate over later and grab the D3 properties (color, etc)
    artistsTempNodes.push(node)
  }

  // function to create child nodes
  const addChildNode = (
    parentNode,
    childNode,
    distance = DEFAULT_DISTANCE,
    isParent = false
  ) => {
    childNode.color = "#FF985F"
    childNode.isParent = isParent
    childNode.size = isParent ? CHILD_NODE_SIZE * 1.35 : CHILD_NODE_SIZE
    defaultNodes.push(childNode)

    defaultLinks.push({
      source: parentNode,
      target: childNode,
      distance: distance,
    })

    // logic for selecting specific artist - creates node links from parent to child
    if (parentNode.id === selectedFilter.filterName) {
      defaultLinks.push({
        source: parentNode,
        target: childNode,
        distance: distance,
        color: "#A3F78E",
        strokeWidth: 5,
      })
      // logic for selecting specific artwork
    } else if (childNode.id === selectedFilter.filterName) {
      defaultLinks.push({
        source: parentNode,
        target: childNode,
        distance: distance,
        color: childNode.color,
        strokeWidth: 5,
      })
    } else {
      defaultLinks.push({
        source: parentNode,
        target: childNode,
        distance: distance,
      })
    }
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
      size: CHILD_NODE_SIZE,
    }

    if (selectedFilter.filterName === artwork.recordId) {
      childNode.fill = "white"
    }

    if (selectedFilter.filterName === artwork.recordId) {
      addChildNode(parentNode, childNode, CHILD_NODE_DISTANCE, true)
    } else {
      addChildNode(parentNode, childNode, CHILD_NODE_DISTANCE)
    }
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

      // create default child nodes
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
    console.log(artists)
    console.log(artwork)
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
