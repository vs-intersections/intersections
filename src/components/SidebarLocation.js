import React from "react"
import Description from "./Description"
import ArtistsAndArtwork from "./ArtistsAndArtwork"

const SidebarLocation = ({
  data,
  locationName,
  artwork,
  description,
  table,
}) => {
  return (
    <>
      <Description
        table={table}
        locationName={locationName}
        description={description}
      />
      <ArtistsAndArtwork artwork={artwork} data={data} />
    </>
  )
}

export default SidebarLocation
