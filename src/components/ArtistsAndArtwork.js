import React, { useContext } from "react"
import { getMetadataByFilterId, translateIdToName2 } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import ArtworkImage from "../components/ArtworkImage"
import Video from "../components/Video"
import { DataContext } from "./context/DataContext"

const ArtistsAndArtwork = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter, setSelectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const handleFilterLinkClick = item =>
    setSelectedFilter({
      filterName: item.id,
      filterType: item.table,
    })

  const {
    recordId,
    data: {
      Artist: artistMetadata,
      Artwork: artwork,
      Primary_Artist__REQUIRED_: primaryArtist,
      Medium: media,
      Theme: themes,
    },
  } = metadata

  // if rendering artwork
  const renderedArtwork = artwork?.map(art => {
    let artist,
      title,
      artistByName,
      themes = [],
      media = [],
      mediaCopy = [],
      themesCopy = [],
      nodeData = {},
      videoFilterLinkData = { table: "artwork" }
    // look at artwork prop and see if any artworks match
    dataObjCopy.artwork.nodes.forEach(node => {
      if (node.recordId === art) {
        nodeData = node.data
        artist = nodeData.Primary_Artist__REQUIRED_[0]
        title = nodeData.Name
        media = nodeData.Medium
        themes = nodeData.Theme
        videoFilterLinkData.recordId = node.recordId

        // convert IDs to names
        if (artist) artistByName = translateIdToName2(data, artist, "artist")
        if (media) mediaCopy = translateIdToName2(data, media, "medium")
        if (themes) themesCopy = translateIdToName2(data, themes, "theme")
      }
    })

    return (
      <div className="grid gap-x-4 grid-cols-artwork mb-6">
        {selectedFilter?.filterType !== "artwork" ? (
          <div className="w-full h-36 md:h-48 text-lg flex justify-center items-center">
            {nodeData.Image ? (
              <ArtworkImage id={primaryArtist} title={title} />
            ) : nodeData.Video ? (
              <Video
                videoSrcURL={nodeData.Video}
                videoTitle={title}
                onlyShowThumb={true}
                videoFilterLinkData={videoFilterLinkData}
              />
            ) : (
              <ArtworkImage id={primaryArtist} title={title} />
            )}
          </div>
        ) : (
          <div className="w-auto h-36 md:h-48 bg-gray-500 text-lg flex justify-center items-center">
            IMAGE
          </div>
        )}
        <div className="flex items-center">
          {" "}
          <div>
            {selectedFilter.filterType !== "artist" && (
              <p className="text-lg">
                <span className="font-bold">Artist: </span>
                <span
                  className="underline-lightGreen"
                  onClick={() => handleFilterLinkClick(artistByName)}
                >
                  {artistByName.name}
                </span>
              </p>
            )}
            <p className="text-lg">
              <span className="font-bold">Title: </span>
              <span
                className="underline-orange cursor"
                onClick={() =>
                  setSelectedFilter({
                    filterName: art,
                    filterType: "artwork",
                  })
                }
              >
                {title}
              </span>
            </p>
            <p className="text-lg">
              <span className="font-bold">Media: </span>
              {mediaCopy.length === 0
                ? "Media not specified"
                : mediaCopy.map((item, i) => {
                    return (
                      <>
                        <span
                          onClick={() => handleFilterLinkClick(item)}
                          key={item.id}
                          className="underline-lightBlue"
                        >
                          {item.name}
                        </span>
                        {mediaCopy.length > i + 1 ? ", " : ""}
                      </>
                    )
                  })}
            </p>
            <p className="text-lg">
              <span className="font-bold">Theme: </span>
              {themesCopy.length === 0
                ? "Theme not specified"
                : themesCopy.map((item, i) => {
                    return (
                      <>
                        <span
                          key={item.id}
                          className="underline-pink"
                          onClick={() => handleFilterLinkClick(item)}
                        >
                          {item.name}
                        </span>
                        {themesCopy.length > i + 1 ? ", " : ""}
                      </>
                    )
                  })}
            </p>
          </div>
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
    if (artistId) artistByName = translateIdToName2(data, artistId, "artist")
    if (media) mediaCopy = translateIdToName2(data, media, "medium")
    if (themes) themesCopy = translateIdToName2(data, themes, "theme")

    return (
      <div
        key={artistId}
        className={`${
          selectedFilter.filterType === "artwork"
            ? "mt-2"
            : "grid gap-x-4 grid-cols-artwork"
        } mb-6`}
      >
        {selectedFilter.filterType !== "artwork" && (
          <div className="w-full h-36 md:h-48 text-lg flex justify-center items-center">
            <ArtworkImage
              id={recordId}
              primaryArtist={artistId}
              title={title}
              filterType={selectedFilter.filterType}
            />
          </div>
        )}
        <div className="flex items-center">
          <div>
            {selectedFilter.filterType !== "artist" && (
              <p className="text-lg">
                <span className="font-bold">Artist: </span>
                <span
                  className="underline-lightGreen"
                  onClick={() => handleFilterLinkClick(artistByName)}
                >
                  {artistByName.name}
                </span>
              </p>
            )}
            {selectedFilter.filterType !== "artwork" &&
              selectedFilter.filterType !== "affiliation" && (
                <p className="text-lg">
                  <span className="font-bold">Title: </span>
                  <span className="underline-orange">{title}</span>
                </p>
              )}
            {selectedFilter.filterType === "artwork" && (
              <p className="text-lg">
                <span className="font-bold">Media: </span>
                {mediaCopy.length === 0
                  ? "Media not specified"
                  : mediaCopy.map((item, i) => {
                      return (
                        <>
                          <span
                            key={item.id}
                            className="underline-lightBlue"
                            onClick={() => handleFilterLinkClick(item)}
                          >
                            {item.name}
                          </span>
                          {mediaCopy.length > i + 1 ? ", " : ""}
                        </>
                      )
                    })}
              </p>
            )}
            {selectedFilter.filterType !== "affiliation" && (
              <p className="text-lg">
                <span className="font-bold">Theme: </span>
                {themesCopy.length === 0
                  ? "Theme not specified"
                  : themesCopy.map((item, i) => {
                      return (
                        <>
                          <span
                            key={item.id}
                            className="underline-pink"
                            onClick={() => handleFilterLinkClick(item)}
                          >
                            {item.name}
                          </span>
                          {themesCopy.length > i + 1 ? ", " : ""}
                        </>
                      )
                    })}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="mb-16">
      {/* render artist without artwork here  */}
      {selectedFilter.filterType !== "artwork" && (
        <h3 className="pb-1 text-2xl font-bold mb-3.5">
          {selectedFilter.filterType === "affiliation" ? "Artists" : "Artwork"}
        </h3>
      )}
      {selectedFilter.filterType === "artwork" ||
      (selectedFilter.filterType === "affiliation" && artistData)
        ? renderedArtist
        : renderedArtwork}
    </div>
  )
}

export default ArtistsAndArtwork
