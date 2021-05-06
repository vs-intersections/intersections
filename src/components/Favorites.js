import React from "react"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const Favorites = ({ data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Favorites: favorites } = metadata.data

  const renderedData = favorites?.map(item => {
    return (
      <p key={item} className="text-lg">
        {item}
      </p>
    )
  })

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Favorites</h3>
      {favorites ? (
        renderedData
      ) : (
        <p className="text-lg">Favorites not specified</p>
      )}
    </div>
  )
}

export default Favorites
