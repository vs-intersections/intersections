import React from "react"
import Description from "./Description"
import Location from "./Location"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarTheme = ({ data, themeName, description, artwork, table }) => {
  return (
    <>
      <Description description={description} table={table} name={themeName} />
      <Location />
      <ArtistsAndArtwork data={data} artwork={artwork} />
    </>
  )
}

export default SidebarTheme
