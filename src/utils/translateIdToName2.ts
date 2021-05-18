// converts IDs to names
// takes the GraphQL data object, the provided ID, and specified table
// then determines if the passed in ID was a string or array
// then returns the ID(s) as names

type Result =
  | {
      name: string
      id: string
      table: string
    }
  | {
      name: string
      id: string
      table: string
    }[]

export const translateIdToName2 = (
  data,
  id: string | [],
  table: string
): Result => {
  const tableToFilter = table !== "artwork" ? `${table}s` : "artwork"
  // checks to see if the ID is a string
  if (typeof id === "string") {
    const result = data[tableToFilter].nodes.find(node => node.recordId === id)
    return {
      name: result?.data?.Name,
      id: result.recordId,
      table: result.table.toLowerCase(),
    }
  }
  // checks to see if the ID is an array of strings
  const namesArray: Result = id.map(item => {
    const result = data[tableToFilter]?.nodes.find(
      node => node.recordId === item
    )
    if (result)
      return {
        name: result.data.Name,
        id: result.recordId,
        table: result.table.toLowerCase(),
      }
  })
  return namesArray
}
