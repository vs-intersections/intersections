import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Influence from "./Influence"
import Favorites from "./Favorites"
// import { data } from "autoprefixer"

const SidebarArtist = ({
  data,
  bio,
  artistName,
  artwork,
  influence,
  favorites,
  table,
}) => {
  return (
    <>
      <Description table={table} name={artistName} description={bio} />
      <ArtistsAndArtwork artwork={artwork} data={data} />
      <Influence data={data} influence={influence} />
      <Favorites data={data} favorites={favorites} />
    </>
  )
}

export default SidebarArtist
