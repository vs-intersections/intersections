import React from "react"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { translateIdToName } from "../utils/translateIdToName"

const ArtistsAndArtwork = ({ data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const {
    Artwork: artwork,
    Primary_Artist__REQUIRED_: primaryArtist,
    Medium: media,
    Theme: themes,
  } = metadata.data

  // if rendering artwork
  const renderedArtwork = artwork?.map(art => {
    let artist,
      title,
      artistByName,
      themes = [],
      media = [],
      mediaCopy = [],
      themesCopy = [],
      nodeData = {}
    // look at artwork prop and see if any artworks match
    dataObjCopy.artwork.nodes.forEach(node => {
      if (node.recordId === art) {
        nodeData = node.data

        artist = nodeData.Primary_Artist__REQUIRED_[0]
        title = nodeData.Name
        media = nodeData.Medium
        themes = nodeData.Theme

        // convert IDs to names
        if (artist) artistByName = translateIdToName(data, artist, "artist")
        if (media) mediaCopy = translateIdToName(data, media, "medium")
        if (themes) themesCopy = translateIdToName(data, themes, "theme")
      }
    })

    return (
      <div key={art} className="grid gap-x-4 grid-cols-artwork mb-6">
        <div className="w-auto h-auto bg-gray-500 color-white">
          IMAGE GOES HERE
        </div>
        <div>
          {selectedFilter.filterType !== "artist" && (
            <p className="text-lg">
              <span className="font-bold">Artist: </span>
              {artistByName}
            </p>
          )}
          <p className="text-lg">
            <span className="font-bold">Title: </span>
            {title}
          </p>
          <p className="text-lg">
            <span className="font-bold">Media: </span>
            {mediaCopy.length === 0
              ? "Media not specified"
              : mediaCopy.map((item, i) => {
                  return (
                    <span key={item}>
                      {item}
                      {mediaCopy.length > i + 1 ? ", " : ""}
                    </span>
                  )
                })}
          </p>
          <p className="text-lg">
            <span className="font-bold">Theme: </span>
            {themesCopy.length === 0
              ? "Theme not specified"
              : themesCopy.map((item, i) => {
                  return (
                    <span key={item}>
                      {item}
                      {themesCopy.length > i + 1 ? ", " : ""}
                    </span>
                  )
                })}
          </p>
        </div>
      </div>
    )
  })

  // if rendering artist
  const renderedArtist = primaryArtist?.map(artistId => {
    let title,
      artistByName,
      mediaCopy = [],
      themesCopy = []

    // convert IDs to names
    if (artistId) artistByName = translateIdToName(data, artistId, "artist")
    if (media) mediaCopy = translateIdToName(data, media, "medium")
    if (themes) themesCopy = translateIdToName(data, themes, "theme")

    return (
      <div key={artistId} className="grid gap-x-4 grid-cols-artwork mb-6">
        <div className="w-auto h-auto bg-gray-500 color-white">
          IMAGE GOES HERE
        </div>
        <div>
          {selectedFilter.filterType !== "artist" && (
            <p className="text-lg">
              <span className="font-bold">Artist: </span>
              {artistByName}
            </p>
          )}
          {selectedFilter.filterType !== "artwork" && (
            <p className="text-lg">
              <span className="font-bold">Title: </span>
              {title}
            </p>
          )}
          <p className="text-lg">
            <span className="font-bold">Media: </span>
            {mediaCopy.length === 0
              ? "Media not specified"
              : mediaCopy.map((item, i) => {
                  return (
                    <span key={item}>
                      {item}
                      {mediaCopy.length > i + 1 ? ", " : ""}
                    </span>
                  )
                })}
          </p>
          <p className="text-lg">
            <span className="font-bold">Theme: </span>
            {themesCopy.length === 0
              ? "Theme not specified"
              : themesCopy.map((item, i) => {
                  return (
                    <span key={item}>
                      {item}
                      {themesCopy.length > i + 1 ? ", " : ""}
                    </span>
                  )
                })}
          </p>
        </div>
      </div>
    )
  })

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">
        {selectedFilter.filterType === "influence" ? "Artists" : "Artwork"}
      </h3>
      {selectedFilter.filterType === "artwork" ? (
        renderedArtist
      ) : !artwork ? (
        <p className="text-lg">Artwork coming soon</p>
      ) : (
        renderedArtwork
      )}
    </div>
  )
}

export default ArtistsAndArtwork
