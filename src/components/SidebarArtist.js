import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Influence from "./Influence"
import Collaborators from "./Collaborators"
import Affiliations from "./Affiliations"
import ArtistPersonalInfo from "./ArtistPersonalInfo"
// import { data } from "autoprefixer"

const SidebarArtist = () => {
  return (
    <>
      <Description />
      <ArtistsAndArtwork />
      <Influence />
      <Collaborators />
      <Affiliations />
      <ArtistPersonalInfo />
    </>
  )
}

export default SidebarArtist
