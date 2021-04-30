import addChildNode from "./addChildNode"
import { locationsAddParentField } from "./filterByLocations"

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
    node.size = MAIN_NODE_SIZE
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
      table: artwork.table,
      isSelectedChild: artwork.data.isSelectedChild || false,
    }

    if (selectedFilter.filterName === artwork.recordId) {
      childNode.fill = "white"
      addChildNode(
        links,
        nodes,
        parentNode,
        childNode,
        CHILD_NODE_DISTANCE,
        true,
        selectedFilter,
        artwork
      )
    } else {
      addChildNode(
        links,
        nodes,
        parentNode,
        childNode,
        CHILD_NODE_DISTANCE,
        false,
        selectedFilter,
        artwork
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
        artwork[x].data.isSelectedParent = true
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

      // ADD MORE PROPERTIES HERE
      const parentNode = {
        id: artist.recordId,
        name: artist.data.Name,
        influence: artist.data.Influence,
        table: artist.table,
      }
      // adds property when selectedFilter is a specific Artist
      if (parentNodeId === selectedFilter.filterName) {
        parentNode.isSelectedParent = true
        parentNode.fill = "white"
      }

      if (selectedFilter.filterType === "location") {
        console.log(selectedFilter.filterType)
        locationsAddParentField(artworkArray, parentNode, selectedFilter)
      }

      addMainNode(parentNode)

      createChildNodes(artworkArray, parentNodeId, parentNode)
    })
  }
  console.log(selectedFilter)

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

  // link selected artwork to main artist and collaborators
  // works by locating artwork in nodes, then locating collaborators in nodes
  // then linking them together
  const linkArtworkToCollaborators = () => {
    for (let y = 0; y < artwork.length; y++) {
      if (artwork[y].recordId === selectedFilter.filterName) {
        artwork[y].data.Collaborators?.forEach(collab => {
          for (
            let artistCounter = 0;
            artistCounter < nodes.length;
            artistCounter++
          ) {
            if (nodes[artistCounter].id === collab) {
              for (
                let artworkCounter = 0;
                artworkCounter < nodes.length;
                artworkCounter++
              ) {
                if (nodes[artworkCounter].id === selectedFilter.filterName) {
                  return links.push({
                    source: nodes[artworkCounter],
                    target: nodes[artistCounter],
                    distance: DEFAULT_DISTANCE,
                    color: nodes[artworkCounter].color,
                    strokeWidth: 5,
                  })
                }
              }
            }
          }
        })
        return
      }
    }
  }

  const populateArrays = () => {
    // spreading the array to concatenate the data (else, array of arrays)
    artists.push(...data.artists.nodes)
    artwork.push(...data.artwork.nodes)
    createParentNodes(artists, artwork)
    linkParentNodes(artistsTempNodes)
    linkArtworkToCollaborators()
    return nodes
  }

  const populatedDefaultNodes = () => {
    const res = populateArrays()
    return { nodes: res, links }
  }

  return populatedDefaultNodes()
}
