import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Influence from "./Influence"
import Favorites from "./Favorites"
import ArtistPersonalInfo from "./ArtistPersonalInfo"
// import { data } from "autoprefixer"

const SidebarArtist = ({ data }) => {
  return (
    <>
      <Description data={data} />
      <ArtistsAndArtwork data={data} />
      <Influence data={data} />
      <Favorites data={data} />
      <ArtistPersonalInfo data={data} />
    </>
  )
}

export default SidebarArtist
