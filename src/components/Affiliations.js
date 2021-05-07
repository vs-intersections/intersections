import React from "react"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const Affiliations = ({ data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Affiliations: affiliations } = metadata.data

  const renderedData = affiliations?.map(item => {
    return (
      <p key={item} className="text-lg">
        {item}
      </p>
    )
  })

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Affiliations</h3>
      {affiliations ? (
        renderedData
      ) : (
        <p className="text-lg">Affiliations not specified</p>
      )}
    </div>
  )
}

export default Affiliations
