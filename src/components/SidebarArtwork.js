import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Location from "./Location"

const SidebarArtwork = ({ data }) => {
  return (
    <>
      <Description />
      <ArtistsAndArtwork />
      <Location />
    </>
  )
}

export default SidebarArtwork
