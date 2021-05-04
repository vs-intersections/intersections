import React from "react"
import Description from "./Description"
import Location from "./Location"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarMedium = ({ data }) => {
  return (
    <>
      <Description />
      <Location />
      <ArtistsAndArtwork />
    </>
  )
}

export default SidebarMedium
