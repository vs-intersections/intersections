import React from "react"
import Description from "./Description"
import Location from "./Location"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarTheme = ({ data }) => {
  return (
    <>
      <Description />
      <Location />
      <ArtistsAndArtwork />
    </>
  )
}

export default SidebarTheme
