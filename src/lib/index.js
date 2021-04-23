export const getMinifiedRecords = (records) =>
  records.map((record) => minifyRecord(record))
const minifyRecord = (record) => ({
  id: record.id,
  fields: record.fields,
})
