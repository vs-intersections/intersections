import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Location from "./Location"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const SidebarArtwork = ({ data }) => {
  // makes a copy of the data object instead of a reference (fixes a lot of bugs)
  const dataObjCopy = Object.assign({}, data)

  const { selectedFilter } = useFilterContext()
  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const {
    table,
    data: {
      Name: filterName,
      Description: description,
      Primary_Artist__REQUIRED_: primaryArtist,
    },
  } = metadata

  return (
    <>
      <Description description={description} table={table} name={filterName} />
      <ArtistsAndArtwork data={data} primaryArtist={primaryArtist} />
      <Location />
    </>
  )
}

export default SidebarArtwork
