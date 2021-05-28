import React, { useContext } from "react"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { DataContext } from "./context/DataContext"

const Influences = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Influence: influence } = metadata.data

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Influences</h3>
      {influence ? (
        <p className="text-lg">{influence}</p>
      ) : (
        <p className="text-lg">Influences not specified</p>
      )}
    </div>
  )
}

export default Influences
