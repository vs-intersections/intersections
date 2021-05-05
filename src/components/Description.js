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

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold">
        {table}: {name}
      </h3>
      <p className="text-lg">
        {description || bio || "Description coming soon"}
      </p>
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
