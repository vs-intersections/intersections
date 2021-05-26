import React, { useContext } from "react"
import { getMetadataByFilterId, translateIdToName2 } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { DataContext } from "./context/DataContext"

const Collaborators = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)

  const { selectedFilter, setSelectedFilter } = useFilterContext()
  let metadata
  let artistCollaborators

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  // Working on getting collabs to show up in Artist sidebar
  // if (selectedFilter.filterType === "artist") {
  //   artistCollaborators = data.artists
  // }

  // console.log(data)
  // console.log(metadata)

  const { Collaborators: collabs } = metadata.data

  let collabNames = []

  if (selectedFilter.filterType === "artist") {
    dataObjCopy.artists.nodes.forEach(node => {
      if (node.isSelectedChild) {
        collabNames.push(node)
      }
    })
  } else if (collabs)
    collabNames = translateIdToName2(dataObjCopy, collabs, "artist")

  const renderedData = collabNames.map(item => (
    <>
      <span
        key={item.id || item.recordId}
        onClick={() =>
          setSelectedFilter({
            filterName: item.id || item.recordId,
            filterType: item.table,
          })
        }
        className="text-lg underline-lightGreen"
      >
        {item.name || item.data.Name}
      </span>
      <br />
    </>
  ))

  return (
    <div className="mb-16">
      {collabNames.length !== 0 && (
        <h3 className="pb-1 text-2xl font-bold mb-3.5">Collaborators</h3>
      )}
      {renderedData}
    </div>
  )
}

export default Collaborators
