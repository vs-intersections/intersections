import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Location from "./Location"
import Collaborators from "./Collaborators"

const SidebarArtwork = ({ data }) => {
  return (
    <>
      <Description data={data} />
      <ArtistsAndArtwork data={data} />
      <Location data={data} />
      <Collaborators data={data} />
    </>
  )
}

export default SidebarArtwork
