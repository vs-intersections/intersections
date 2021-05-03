// if the current filter is Location
// iterate over the artwork array, check to see if selectedFilter Location is listed
// on any of the artwork, and if it is, add isSelectedParent to artist,
// then add isSelectedChild field to the Artwork piece
export const locationAddParentField = (
  artworkArray,
  parentNode,
  selectedFilter
) => {
  artworkArray.forEach(artwork => {
    if (parentNode.id === artwork.data.Primary_Artist__REQUIRED_[0]) {
      artwork.data.Locations?.forEach(location => {
        if (location === selectedFilter.filterName) {
          parentNode.isSelectedParent = true
          parentNode.fill = "white"
          parentNode.linkColor = "#62B4FF"
          artwork.data.isSelectedChild = true
        }
      })
    }
  })
  return artworkArray
}
