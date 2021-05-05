import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarInfluence = ({ data }) => {
  return (
    <>
      <Description data={data} />
      <ArtistsAndArtwork data={data} />
    </>
  )
}

export default SidebarInfluence
