export const getMetadataByFilterId = (data, filterId: string) => {
  const flattenedMetaData = [
    ...data?.artists.nodes,
    ...data?.artwork.nodes,
    ...data?.locations.nodes,
    ...data?.themes.nodes,
    ...data?.mediums.nodes,
    ...data?.influences.nodes,
  ]
  return flattenedMetaData.find(el => el.recordId === filterId)
}
