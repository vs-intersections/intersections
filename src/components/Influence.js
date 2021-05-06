import React from "react"
import { getMetadataByFilterId, translateIdToName } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const Influence = ({ data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Influence: influence } = metadata.data

  let influenceNames = []
  if (influence)
    influenceNames = translateIdToName(data, influence, "influence")

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Influence</h3>
      {influenceNames.length === 0 ? (
        <p className="text-lg">
          It doesn't look like this artist has any influences
          <span className="block">How mysterious...</span>
        </p>
      ) : (
        influenceNames.map(item => (
          <p key={item} className="text-lg underline-yellow">
            {item}
          </p>
        ))
      )}
    </div>
  )
}

export default Influence
