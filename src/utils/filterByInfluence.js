// iterate over the artist array, check to see if selectedFilter Influence is listed
// on any of the artists, and if it is, add isSelectedParent to artist
export const influenceAddParentField = (parentNode, selectedFilter) => {
  parentNode.influence?.forEach(influence => {
    if (influence === selectedFilter.filterName) {
      parentNode.isSelectedParent = true
      parentNode.fill = "white"
      parentNode.linkColor = "#fff128"
    }
  })
}
