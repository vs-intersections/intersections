import React from "react"
import {
  getMetadataByFilterId,
  translateIdToName,
  getLocations,
} from "../utils"
import { useFilterContext } from "./context/FilterContext"

const Location = ({ data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const {
    recordId,
    data: {
      Locations: locations,
      Primary_Artist__REQUIRED_: primaryArtist,
      Medium: media,
      Theme: themes,
    },
  } = metadata

  let locationIds = []
  let locationNames = []

  // for Artwork dropdown
  if (selectedFilter.filterType === "artwork") {
    if (locations)
      locationNames = translateIdToName(dataObjCopy, locations, "location")
  }

  // for Theme dropdown
  if (
    selectedFilter.filterType === "theme" ||
    (selectedFilter.filterType === "medium" && recordId)
  ) {
    locationIds = getLocations(dataObjCopy, recordId, selectedFilter.filterType)

    if (locationIds.length)
      locationNames = translateIdToName(dataObjCopy, locationIds, "location")
  }

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Current Locations</h3>
      {locationNames.length ? (
        locationNames.map(item => (
          <p key={item} className="text-lg underline-blue">
            {item}
          </p>
        ))
      ) : (
        <p className="text-lg">Not currently located anywhere</p>
      )}
    </div>
  )
}

export default Location
