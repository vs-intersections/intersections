import React from "react"
import { getMetadataByFilterId, translateIdToName2 } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const Collaborators = ({ data }) => {
  // makes a copy of the data object instead of a reference (fixes a lot of bugs)
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
  if (collabs) collabNames = translateIdToName2(data, collabs, "artist")

  return (
    <div className="mb-16">
      {collabNames.length !== 0 && (
        <h3 className="pb-1 text-2xl font-bold mb-3.5">Collaborators</h3>
      )}
      {collabNames.map(item => (
        <>
          <span key={item.id} onClick={() => setSelectedFilter({
            filterName: item.id,
            filterType: item.table
          })} className="text-lg underline-lightGreen">
            {item.name}
          </span>
          <br />
        </>
      ))}
    </div>
  )
}

export default Collaborators
