import React from "react"
import { getMetadataByFilterId, translateIdToName } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const ArtistsAndArtwork = ({ data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
    console.log("METADATA +++++++++++++++++++")
    console.log(metadata)
  }

  const {
    Artist: artistMetadata,
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
        <div className="w-auto h-32 bg-gray-500 text-lg flex justify-center items-center">
          IMAGE
        </div>
        <div>
          {selectedFilter.filterType !== "artist" && (
            <p className="text-lg">
              <span className="font-bold">Artist: </span>
              <span className="underline-lightGreen">{artistByName}</span>
            </p>
          )}
          <p className="text-lg">
            <span className="font-bold">Title: </span>
            <span className="underline-orange">{title}</span>
          </p>
          <p className="text-lg">
            <span className="font-bold">Media: </span>
            {mediaCopy.length === 0
              ? "Media not specified"
              : mediaCopy.map((item, i) => {
                  return (
                    <span key={item} className="underline-lightBlue">
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
                    <span key={item} className="underline-pink">
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

  const artistData = primaryArtist || artistMetadata

  // if rendering artist(s)
  const renderedArtist = artistData?.map(artistId => {
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
        <div className="w-auto h-32 bg-gray-500 text-lg flex justify-center items-center">
          IMAGE
        </div>
        <div>
          {selectedFilter.filterType !== "artist" && (
            <p className="text-lg">
              <span className="font-bold">Artist: </span>
              <span className="underline-lightGreen">{artistByName}</span>
            </p>
          )}
          {selectedFilter.filterType !== "artwork" &&
            selectedFilter.filterType !== "influence" && (
              <p className="text-lg">
                <span className="font-bold">Title: </span>
                <span className="underline-orange">{title}</span>
              </p>
            )}
          {selectedFilter.filterType !== "influence" && (
            <p className="text-lg">
              <span className="font-bold">Media: </span>
              {mediaCopy.length === 0
                ? "Media not specified"
                : mediaCopy.map((item, i) => {
                    return (
                      <span key={item} className="underline-lightBlue">
                        {item}
                        {mediaCopy.length > i + 1 ? ", " : ""}
                      </span>
                    )
                  })}
            </p>
          )}
          {selectedFilter.filterType !== "influence" && (
            <p className="text-lg">
              <span className="font-bold">Theme: </span>
              {themesCopy.length === 0
                ? "Theme not specified"
                : themesCopy.map((item, i) => {
                    return (
                      <span key={item} className="underline-pink">
                        {item}
                        {themesCopy.length > i + 1 ? ", " : ""}
                      </span>
                    )
                  })}
            </p>
          )}
        </div>
      </div>
    )
  })

  return (
    <div className="mb-16">
      {selectedFilter.filterType !== "artwork" && (
        <h3 className="pb-1 text-2xl font-bold mb-3.5">
          {selectedFilter.filterType === "influence" ? "Artists" : "Artwork"}
        </h3>
      )}
      {selectedFilter.filterType === "artwork" ||
      (selectedFilter.filterType === "influence" && artistData) ? (
        renderedArtist
      ) : selectedFilter.filterType === "location" ||
        selectedFilter.filterType === "theme" ||
        selectedFilter.filterType === "medium" ||
        (selectedFilter.filterType === "artist" && !artistData) ? (
        <p className="text-lg">Artwork coming soon</p>
      ) : selectedFilter.filterType === "artwork" ||
        (selectedFilter.filterType === "influence" && !artistData) ? (
        <p className="text-lg">Artists coming soon</p>
      ) : (
        renderedArtwork
      )}
    </div>
  )
}

export default ArtistsAndArtwork
