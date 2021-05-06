import React from "react"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const ArtistPersonalInfo = ({ data }) => {
  const dataObjCopy = Object.assign({}, data)

  const { selectedFilter } = useFilterContext()
  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Hometown: hometown, Email: email, Website: site } = metadata.data

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">More Info</h3>
      {hometown && (
        <p className="text-lg">
          <span className="font-bold">Hometown:</span> {hometown}
        </p>
      )}
      {site && (
        <p className="text-lg">
          <span className="font-bold">Website:</span>{" "}
          <a className="underline" target="_blank" href={site}>
            {site}
          </a>
        </p>
      )}
      {email && (
        <p className="text-lg">
          <span className="font-bold">Email:</span>{" "}
          <a className="underline" href={`mailto: ${email}`}>
            {email}
          </a>
        </p>
      )}
    </div>
  )
}

export default ArtistPersonalInfo
