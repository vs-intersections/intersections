// if the current filter is Influence
// iterate over the artwork array, check to see if selectedFilter Influence is listed
// on any of the artwork, and if it is, add isSelectedParent to artist,
// then add isSelectedChild field to the Artwork piece
export const influenceAddParentField = (
  artistsArray,
  parentNode,
  selectedFilter
) => {
  if (parentNode.influence.includes(selectedFilter.filterName)) {
    parentNode.isSelectedParent = true
    parentNode.fill = "white"
    parentNode.linkColor = "#E7FF57"
  }
}
// artistsArray.forEach(artist => {
//   console.log(parentNode);
// if (artist.data.Influence.includes(selectedFilter.filterName)) {
//   parentNode.isSelectedParent = true
//   parentNode.fill = "white"
//   parentNode.linkColor = "#62B4FF"
//   artwork.data.linkColor = "#62B4FF"
//   artwork.data.isSelectedChild = true
// }
// })
