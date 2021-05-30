// iterate over the artist array, check to see if selectedFilter Affiliation is listed
// on any of the artists, and if it is, add isSelectedParent to artist
export const affiliationAddParentField = (parentNode, selectedFilter) => {
  parentNode.affiliation?.forEach(affiliation => {
    if (affiliation === selectedFilter.filterName) {
      parentNode.isSelectedParent = true
      parentNode.fill = "white"
      parentNode.linkColor = "#fff128"
    }
  })
}
