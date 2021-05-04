import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Location from "./Location"
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
      <Location />
      <Influence />
      <Favorites />
    </>
  )
}

export default SidebarArtist
