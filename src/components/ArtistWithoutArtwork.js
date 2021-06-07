import React, { useContext } from "react"
import { getMetadataByFilterId, translateIdToName } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { DataContext } from "./context/DataContext"

const ArtistWithoutArtwork = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter, setSelectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const { Collaborated_On: collaboratedOn, Name: name } = metadata.data

  const parsedArtists = []

  collaboratedOn.forEach(artPiece => {
    const result = dataObjCopy.artwork.nodes.find(
      artwork => artwork.recordId === artPiece
    )

    parsedArtists.push({
      artistName: translateIdToName(
        dataObjCopy,
        result.data.Primary_Artist__REQUIRED_[0],
        "artist"
      ),
      artistId: result.data.Primary_Artist__REQUIRED_[0],
      artPieceName: result.data.Name,
      artPieceId: artPiece,
    })
  })

  const renderedArtwork = parsedArtists.map(artwork => {
    return (
      <div>
        <span
          key={artwork.artPieceId}
          className="text-lg underline-orange"
          onClick={() => {
            setSelectedFilter({
              filterName: artwork.artPieceId,
              filterType: "artwork",
            })
          }}
        >
          {artwork.artPieceName}
        </span>
      </div>
    )
  })

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Collaborations</h3>
      <p className="text-lg">
        {name} has collaborated with{" "}
        <span
          key={parsedArtists[0].artistId}
          className="text-lg underline-lightGreen"
          onClick={() => {
            setSelectedFilter({
              filterName: parsedArtists[0].artistId,
              filterType: "Artist",
            })
          }}
        >
          {parsedArtists[0].artistName}
        </span>{" "}
        on the following artwork(s):
      </p>
      <div>{renderedArtwork}</div>
    </div>
  )
}

export default ArtistWithoutArtwork
