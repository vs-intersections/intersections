// if artwork contains the selected location, add a link from artwork to parent
// add a field on the artwork 'hasLink'
// this field will be looked at during the childNodeLinking process
// to determine if a new link needs to be created, skip is hasLink is present
const addLink = links => {
  console.log(links)
}

// if the current filter is Location
// iterate over the artwork array, check to see if selectedFilter Location is listed
// on any of the artwork, and if it is, add isSelectedParent to artist,
// then add isSelectedChild field to the Artwork piece
export const locationsAddParentField = (
  artworkArray,
  parentNode,
  selectedFilter
) => {
  artworkArray.forEach(artwork => {
    parentNode.id === artwork.data.Primary_Artist__REQUIRED_[0] &&
      artwork.data.Locations?.forEach(location => {
        if (location === selectedFilter.filterName) {
          parentNode.isSelectedParent = true
          parentNode.fill = "white"
          // call 'add child link' function
          // addLink(links)
          artwork.data.isSelectedChild = true
        } else {
          artwork.data.isSelectedChild = false
        }
      })
  })
}
