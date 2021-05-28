import React, { useContext } from "react"
import { getMetadataByFilterId, translateIdToName2 } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { DataContext } from "./context/DataContext"

const Affiliation = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter, setSelectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Affiliation: affiliation } = metadata.data

  let affiliationNames = []
  if (affiliation)
    affiliationNames = translateIdToName2(data, affiliation, "affiliation")

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Affiliation</h3>
      {affiliationNames.length === 0 ? (
        <p className="text-lg">
          It doesn't look like this artist has any affiliations
          <span className="block">How mysterious...</span>
        </p>
      ) : (
        affiliationNames.map(item => (
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

export default Affiliation
