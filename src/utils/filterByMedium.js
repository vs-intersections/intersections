// if the current filter is Medium
// iterate over the artwork array, check to see if selectedFilter Medium is listed
// on any of the artwork, and if it is, add isSelectedParent to artist,
// then add isSelectedChild field to the Artwork piece
export const mediumAddParentField = (
  artworkArray,
  parentNode,
  selectedFilter
) => {
  artworkArray.forEach(artwork => {
    parentNode.id === artwork.data.Primary_Artist__REQUIRED_[0] &&
      artwork.data.Medium?.forEach(medium => {
        if (medium === selectedFilter.filterName) {
          parentNode.isSelectedParent = true
          parentNode.fill = "white"
          parentNode.linkColor = "#43F4FF"
          artwork.data.linkColor = "#43F4FF"
          artwork.data.isSelectedChild = true
        }
      })
  })
}
