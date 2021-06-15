import React from "react"
import Description from "./Description"
import Location from "./Location"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarTheme = ({ data }) => {
  return (
    <>
      <Description data={data} />
      <ArtistsAndArtwork data={data} />
      <Location data={data} />
    </>
  )
}

export default SidebarTheme
