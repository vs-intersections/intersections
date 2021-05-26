import React, { useContext } from "react"
import { getMetadataByFilterId, translateIdToName2 } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { DataContext } from "./context/DataContext"

const Influence = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter, setSelectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Influence: influence } = metadata.data

  let influenceNames = []
  if (influence)
    influenceNames = translateIdToName2(data, influence, "influence")

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
          <span
            key={item}
            className="text-lg underline-yellow"
            onClick={() => {
              setSelectedFilter({
                filterName: item.id,
                filterType: item.table,
              })
            }}
          >
            {item.name}
          </span>
        ))
      )}
    </div>
  )
}

export default Influence
