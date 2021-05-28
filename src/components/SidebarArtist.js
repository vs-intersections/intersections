import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Affiliation from "./Affiliation"
import Collaborators from "./Collaborators"
import Affiliations from "./Affiliations"
import ArtistPersonalInfo from "./ArtistPersonalInfo"
// import { data } from "autoprefixer"

const SidebarArtist = () => {
  return (
    <>
      <Description />
      <ArtistsAndArtwork />
      <Affiliation />
      <Collaborators />
      <Affiliations />
      <ArtistPersonalInfo />
    </>
  )
}

export default SidebarArtist
