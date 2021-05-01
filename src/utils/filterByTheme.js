// if the current filter is Theme
// iterate over the artwork array, check to see if selectedFilter Theme is listed
// on any of the artwork, and if it is, add isSelectedParent to artist,
// then add isSelectedChild field to the Artwork piece
export const themeAddParentField = (
  artworkArray,
  parentNode,
  selectedFilter
) => {
  artworkArray.forEach(artwork => {
    parentNode.id === artwork.data.Primary_Artist__REQUIRED_[0] &&
      artwork.data.Theme?.forEach(theme => {
        if (theme === selectedFilter.filterName) {
          parentNode.isSelectedParent = true
          parentNode.fill = "white"
          parentNode.linkColor = "#F36AFF"
          artwork.data.linkColor = "#F36AFF"
          artwork.data.isSelectedChild = true
        }
      })
  })
}
