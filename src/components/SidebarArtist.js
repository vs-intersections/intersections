import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Influence from "./Influence"
import Collaborators from "./Collaborators"
import Affiliations from "./Affiliations"
import ArtistPersonalInfo from "./ArtistPersonalInfo"
// import { data } from "autoprefixer"

const SidebarArtist = ({ data }) => {
  return (
    <>
      <Description data={data} />
      <ArtistsAndArtwork data={data} />
      <Influence data={data} />
      <Collaborators data={data} />
      <Affiliations data={data} />
      <ArtistPersonalInfo data={data} />
    </>
  )
}

export default SidebarArtist
