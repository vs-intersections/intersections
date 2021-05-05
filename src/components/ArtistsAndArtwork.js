import React from "react"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { translateIdToName } from "../utils/translateIdToName"

const ArtistsAndArtwork = ({ artwork, primaryArtist, data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
    console.log("MetaData:")
    console.log(metadata)
  }

  // const {
  //   table,
  //   data: {
  //     Collaborators: collabs,
  //     Name: filterName,
  //     Artwork: artwork,
  //     Artist: artists,
  //     Description: description,
  //     Bio: bio,
  //     Influence: influence,
  //     Favorites: favorites,
  //     Primary_Artist__REQUIRED_: primaryArtist,
  //   },
  // } = metadata

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
            {mediaCopy.map((item, i) => {
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
            {themesCopy.map((item, i) => {
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

  // const renderedArtist = () => {
  //   let artist,
  //     title,
  //     artistByName,
  //     themes = [],
  //     media = [],
  //     mediaCopy = [],
  //     themesCopy = [],
  //     nodeData = {}
  //   // look at artwork prop and see if any artworks match
  //   dataObjCopy.artwork.nodes.forEach(node => {
  //     if (node.recordId === art) {
  //       nodeData = node.data

  //       artist = nodeData.Primary_Artist__REQUIRED_[0]
  //       title = nodeData.Name
  //       media = nodeData.Medium
  //       themes = nodeData.Theme

  //       // convert IDs to names
  //       if (artist) artistByName = translateIdToName(data, artist, "artist")
  //       if (media) mediaCopy = translateIdToName(data, media, "medium")
  //       if (themes) themesCopy = translateIdToName(data, themes, "theme")
  //     }
  //   })

  //   return (
  //     <div key={art} className="grid gap-x-4 grid-cols-artwork mb-6">
  //       <div className="w-auto h-auto bg-gray-500 color-white">
  //         IMAGE GOES HERE
  //       </div>
  //       <div>
  //         {selectedFilter.filterType !== "artist" && (
  //           <p className="text-lg">
  //             <span className="font-bold">Artist: </span>
  //             {artistByName}
  //           </p>
  //         )}
  //         <p className="text-lg">
  //           <span className="font-bold">Title: </span>
  //           {title}
  //         </p>
  //         <p className="text-lg">
  //           <span className="font-bold">Media: </span>
  //           {mediaCopy.map((item, i) => {
  //             return (
  //               <span key={item}>
  //                 {item}
  //                 {mediaCopy.length > i + 1 ? ", " : ""}
  //               </span>
  //             )
  //           })}
  //         </p>
  //         <p className="text-lg">
  //           <span className="font-bold">Theme: </span>
  //           {themesCopy.map((item, i) => {
  //             return (
  //               <span key={item}>
  //                 {item}
  //                 {themesCopy.length > i + 1 ? ", " : ""}
  //               </span>
  //             )
  //           })}
  //         </p>
  //       </div>
  //     </div>
  //   )
  // })

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">
        {selectedFilter.filterType === "influence" ? "Artists" : "Artwork"}
      </h3>
      {selectedFilter.filterType}
      {/* {selectedFilter.filterType === 'artwork' renderedArtist : renderedArtwork} */}
    </div>
  )
}

export default ArtistsAndArtwork
