import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarInfluence = ({
  data,
  influenceName,
  description,
  artists,
  table,
}) => {
  return (
    <>
      <Description
        description={description}
        table={table}
        name={influenceName}
      />
      <ArtistsAndArtwork data={data} artists={artists} />
    </>
  )
}

export default SidebarInfluence
