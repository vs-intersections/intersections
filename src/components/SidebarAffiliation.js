import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarAffiliation = ({ data }) => {
  return (
    <>
      <Description data={data} />
      <ArtistsAndArtwork data={data} />
    </>
  )
}

export default SidebarAffiliation
