import React from "react"
import { getMetadataByFilterId, translateIdToName } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const Collaborators = ({ data }) => {
  // makes a copy of the data object instead of a reference (fixes a lot of bugs)
  const dataObjCopy = Object.assign({}, data)

  const { selectedFilter } = useFilterContext()
  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Collaborators: collabs } = metadata.data

  let collabNames = []
  if (collabs) collabNames = translateIdToName(data, collabs, "artist")

  return (
    <div className="mb-16">
      {collabNames.length !== 0 && (
        <h3 className="pb-1 text-2xl font-bold mb-3.5">Collaborators</h3>
      )}
      {collabNames.map(item => (
        <p key={item} className="text-lg underline-lightGreen">
          {item}
        </p>
      ))}
    </div>
  )
}

export default Collaborators
