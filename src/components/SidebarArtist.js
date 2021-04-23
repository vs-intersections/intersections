import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"
import Location from "./Location"
import Influence from "./Influence"
import Favorites from "./Favorites"

const SidebarArtist = () => {
  return (
    <div>
      <Description />
      <ArtistsAndArtwork />
      <Location />
      <Influence />
      <Favorites />
    </div>
  )
}

export default SidebarArtist
