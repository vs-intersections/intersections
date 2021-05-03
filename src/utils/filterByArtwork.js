// iterate over the artwork array, check to see if selectedFilter Artist is listed
// on any of the artwork, and if it is, add isSelectedParent to artist,
// then add isSelectedChild field to the Artwork piece
export const artworkAddParentField = (
  artworkArray,
  parentNode,
  selectedFilter
) => {
  // parentNode.isSelectedParent = true
  // parentNode.fill = "white"
  // parentNode.linkColor = "#A3F78E" // light green
  artworkArray.forEach(artwork => {
    if (artwork.recordId === selectedFilter.filterName) {
      artwork.data.isSelectedParent = true
      artwork.data.linkColor = "#FF985F"
      artwork.data.fill = "white"

      if (parentNode.id === artwork.data.Primary_Artist__REQUIRED_[0]) {
        parentNode.isSelectedChildMain = true
        parentNode.fill = artwork.data.fill
        parentNode.linkColor = artwork.data.linkColor
      }

      artwork.data.Collaborators?.forEach(collaborator => {
        if (parentNode.id === collaborator) {
          parentNode.isSelectedChild = true
          parentNode.fill = artwork.data.fill
          parentNode.linkColor = artwork.data.linkColor
        }
      })
    }
  })

  return artworkArray
}
