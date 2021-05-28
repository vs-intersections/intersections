import React, { useContext } from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Affiliation from "./Affiliation"
import Collaborators from "./Collaborators"
import Influences from "./Influences"
import ArtistPersonalInfo from "./ArtistPersonalInfo"
import ArtistWithoutArtwork from "./ArtistWithoutArtwork"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { DataContext } from "./context/DataContext"

const SidebarArtist = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  return (
    <>
      <Description />
      {metadata.data.Artwork ? (
        <ArtistsAndArtwork />
      ) : metadata.data.Collaborated_On ? (
        <ArtistWithoutArtwork />
      ) : (
        ""
      )}
      {metadata.data.Affiliation && <Affiliation />}
      <Collaborators />
      {metadata.data.Influence && <Influences />}
      <ArtistPersonalInfo />
    </>
  )
}

export default SidebarArtist
