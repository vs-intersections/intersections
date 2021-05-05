import React from "react"
import Description from "./Description"
import Location from "./Location"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarMedium = ({ data, mediumName, description, artwork, table }) => {
  return (
    <>
      <Description description={description} table={table} name={mediumName} />
      <Location />
      <ArtistsAndArtwork data={data} artwork={artwork} />
    </>
  )
}

export default SidebarMedium
