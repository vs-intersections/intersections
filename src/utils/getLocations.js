// this function creates an array of locations from a set of data (artists, themes, etc)
export const getLocations = (data, id, table) => {
  // converts the table to a property of the data
  const dataTable =
    table === "theme" ? "Theme" : table === "medium" ? "Medium" : ""

  // populate an array with locations

  let locationIds = []
  if (table === "theme" || table === "medium") {
    data.artwork.nodes.forEach(node => {
      node.data[dataTable]?.forEach(item => {
        if (item === id) {
          node.data.Locations?.forEach(i => locationIds.push(i))
        }
      })
    })
  }
  // deduplicate the array
  let locationNames = [...new Set(locationIds)]
  return locationNames
}
