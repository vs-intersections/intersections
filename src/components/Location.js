import React from "react"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { translateIdToName } from "../utils/translateIdToName"

const Location = ({ data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
    console.log("METADATA")
    console.log(metadata)
  }

  const {
    Artwork: artwork,
    Primary_Artist__REQUIRED_: primaryArtist,
    Medium: media,
    Theme: themes,
  } = metadata.data

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Current Locations</h3>
      <p className="text-lg">Downtown Santa Fe</p>
      <p className="text-lg">Railyards</p>
    </div>
  )
}

export default Location
