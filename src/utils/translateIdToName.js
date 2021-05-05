// converts IDs to names
// takes the GraphQL data object, the provided ID, and specified table
// then determines if the passed in ID was a string or array
// then returns the ID(s) as names

export const translateIdToName = (data, id, table) => {
  // converts the table to a property of the data
  const dataTable =
    table === "artist"
      ? "artists"
      : table === "artwork"
      ? "artwork"
      : table === "location"
      ? "locations"
      : table === "theme"
      ? "themes"
      : table === "medium"
      ? "mediums"
      : "influences"

  // checks to see if the ID is a string
  if (typeof id === "string") {
    const result = data[dataTable].nodes.find(node => node.recordId === id)
    return result.data.Name
  }
  // checks to see if the ID is an array of strings
  if (Array.isArray(id)) {
    const namesArray = id.map(item => {
      const result = data[dataTable]?.nodes.find(node => node.recordId === item)
      if (result) return result.data.Name
    })
    return namesArray
  }
}
