// iterate over the artwork array, check to see if selectedFilter Artist is listed
// on any of the artwork, and if it is, add isSelectedParent to artist,
// then add isSelectedChild field to the Artwork piece
export const artistAddParentField = (
  artworkArray,
  parentNode,
  selectedFilter
) => {
  parentNode.isSelectedParent = true
  parentNode.fill = "white"
  parentNode.linkColor = "#A3F78E"

  artworkArray.forEach(artwork => {
    if (
      artwork.data.Primary_Artist__REQUIRED_[0] === selectedFilter.filterName
    ) {
      artwork.data.linkColor = "#A3F78E"
      artwork.data.fill = "white"
      artwork.data.isSelectedChild = true
    }
  })
}
