import React from "react"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const SidebarDescription = ({ data }) => {
  // makes a copy of the data object instead of a reference (fixes a lot of bugs)
  const dataObjCopy = Object.assign({}, data)

  const { selectedFilter } = useFilterContext()
  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const {
    table,
    data: { Bio: bio, Description: description, Name: name },
  } = metadata

  const desc = description || bio

  const descProcess = () => {
    if (desc) {
      const splitText = desc.split("\n\n")
      return splitText
    }
  }

  let processedDescription = []
  if (desc) processedDescription = descProcess()

  const renderedDescription = processedDescription.map(item => {
    return <p className="text-lg">{item}</p>
  })

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold">
        {table}: {name}
      </h3>
      {desc ? (
        renderedDescription
      ) : (
        <p className="text-lg">Description coming soon</p>
      )}
      {(selectedFilter.filterType !== "location" ||
        selectedFilter.filterType !== "artist") && (
        <div className="w-full h-96 bg-gray-500 mt-3">
          <span className="text-lg flex justify-center items-center h-full">
            IMAGE
          </span>
        </div>
      )}
    </div>
  )
}

export default SidebarDescription
