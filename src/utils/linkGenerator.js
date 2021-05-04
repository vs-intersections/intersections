import addChildNode from "./addChildNode"
import { artistAddParentField } from "./filterByArtist"
import { artworkAddParentField } from "./filterByArtwork"
import { locationAddParentField } from "./filterByLocation"
import { themeAddParentField } from "./filterByTheme"
import { mediumAddParentField } from "./filterByMedium"
import { influenceAddParentField } from "./filterByInfluence"

const MAIN_NODE_SIZE = 15
export const CHILD_NODE_SIZE = 15
export const DEFAULT_DISTANCE = 60
const MAIN_NODE_DISTANCE = 150
const CHILD_NODE_DISTANCE = 20
const PARENT_NODE_COLOR = "#A3F78E"
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

  // function to add parent nodes to the node array
  const addMainNode = node => {
    node.size = MAIN_NODE_SIZE
    node.color = PARENT_NODE_COLOR
    nodes.push(node)

    // to interate over later and grab the D3 properties (color, etc)
    artistsTempNodes.push(node)
  }

  // function to assemble child nodes before calling addChildNode
  const assembleChildNode = (parentNode, artwork) => {
    let childNode = {
      id: artwork.recordId,
      name: artwork.data.Name,
      collaborators: artwork.data.Collaborators || null,
      locations: artwork.data.Locations,
      medium: artwork.data.Medium,
      theme: artwork.data.Theme,
      linkColor: artwork.data.linkColor || null,
      size: artwork.data.isSelectedChild
        ? CHILD_NODE_SIZE * 0.8
        : CHILD_NODE_SIZE,
      table: artwork.table,
      fill: artwork.data.fill,
      isSelectedChild: artwork.data.isSelectedChild,
      isSelectedParent: artwork.data.isSelectedParent,
    }

    addChildNode(
      links,
      nodes,
      parentNode,
      childNode,
      CHILD_NODE_DISTANCE,
      selectedFilter,
      artwork
    )
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
      // if artistB.id equals the current filter name AND current artwork primary artist equals the filter name
      // AND the current artwork collaborators is not empty
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
            return linkMainNodesDefault(artistA, artistB, PARENT_NODE_COLOR, 5)
          }
        }
      }
    }
    if (!hasBeenInvoked) linkMainNodesDefault(artistA, artistB)
  }

  // create child nodes
  const createChildNodes = (artworkArray, parentNode) => {
    artworkArray.forEach(artwork => {
      if (artwork.data.Primary_Artist__REQUIRED_[0] === parentNode.id) {
        assembleChildNode(parentNode, artwork)
      }
    })
  }

  // create parent nodes
  const createParentAndChildNodes = (artistsArray, artworkArray) => {
    artistsArray.forEach(artist => {
      // add additional parent node properties here
      const parentNode = {
        id: artist.recordId,
        name: artist.data.Name,
        influence: artist.data.Influence,
        table: artist.table,
      }
      // calls function to add property when selectedFilter is a specific Artist
      if (parentNode.id === selectedFilter.filterName) {
        let tempArr = artistAddParentField(
          artworkArray,
          artistsArray,
          parentNode
        )
        artistsArray = [...tempArr]
      }

      // calls function to add property when selectedFilter is a specific Artwork
      if (selectedFilter.filterType === "artwork") {
        let tempArr = artworkAddParentField(
          artworkArray,
          parentNode,
          selectedFilter
        )
        artworkArray = [...tempArr]
      }

      // calls function to add property when selectedFilter is a specific Location
      if (selectedFilter.filterType === "location") {
        let tempArr = locationAddParentField(
          artworkArray,
          parentNode,
          selectedFilter
        )
        artworkArray = [...tempArr]
      }

      // // calls function to add property when selectedFilter is a specific Theme
      if (selectedFilter.filterType === "theme") {
        let tempArr = themeAddParentField(
          artworkArray,
          parentNode,
          selectedFilter
        )
        artworkArray = [...tempArr]
      }

      // // calls function to add property when selectedFilter is a specific Medium
      if (selectedFilter.filterType === "medium") {
        let tempArr = mediumAddParentField(
          artworkArray,
          parentNode,
          selectedFilter
        )
        artworkArray = [...tempArr]
      }

      // // calls function to add property when selectedFilter is a specific Influence
      if (selectedFilter.filterType === "influence") {
        influenceAddParentField(parentNode, selectedFilter)
      }

      addMainNode(parentNode)

      createChildNodes(artworkArray, parentNode)
    })
  }

  const linkParentNodes = artistsArray => {
    // links every artist to each artist
    artistsArray.forEach((artistA, i) => {
      artistsArray.slice(i + 1).forEach(artistB => {
        // checks to see if there is a filtered selection
        if (
          artistA.isSelectedParent &&
          artistB.isSelectedParent &&
          selectedFilter.filterType === "location"
        ) {
          linkMainNodesDefault(artistA, artistB, "#62B4FF", 5)
        } else if (
          artistA.isSelectedParent &&
          artistB.isSelectedParent &&
          selectedFilter.filterType === "theme"
        ) {
          linkMainNodesDefault(artistA, artistB, "#F36AFF", 5)
        } else if (
          artistA.isSelectedParent &&
          artistB.isSelectedParent &&
          selectedFilter.filterType === "medium"
        ) {
          linkMainNodesDefault(artistA, artistB, "#43F4FF", 5)
        } else if (
          artistA.isSelectedParent &&
          artistB.isSelectedParent &&
          selectedFilter.filterType === "influence"
        ) {
          linkMainNodesDefault(artistA, artistB, "#E7FF57", 5)
        } else if (
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
    // setting the isSelectedParent property to false to fix numerous rendering issues
    artists.forEach(artist => {
      artist.data.isSelectedParent = false
      artist.data.isSelectedChildMain = false
    })
    artwork.push(...data.artwork.nodes)
    // setting the isSelectedChild property to false to fix numerous rendering issues
    artwork.forEach(art => {
      art.data.isSelectedParent = false
      art.data.isSelectedChild = false
    })
    createParentAndChildNodes(artists, artwork)
    linkParentNodes(artistsTempNodes)
    linkArtworkToCollaborators()
    return nodes
  }

  const populateNodesAndLinks = () => {
    // generates an array of nodes and links
    const res = populateArrays()
    // return the array of nodes and links to be used by the node graph
    return { nodes: res, links }
  }

  return populateNodesAndLinks()
}
