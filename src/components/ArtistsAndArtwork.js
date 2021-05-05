import React from "react"
import { useFilterContext } from "./context/FilterContext"

// When clicking 'Buffalo Thunder", the Artist field is empty and media and themes are IDs instead of names

const ArtistsAndArtwork = ({ artists, artwork, data }) => {
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()
  const renderedArtistsAndArtwork = artwork?.map(art => {
    // vars that will be assigned from destructuring
    let artist = [],
      title,
      media = [],
      themes = [],
      artistByName,
      themesCopy = [],
      mediaCopy = []
    // look at artwork prop and see if any artworks match
    dataObjCopy.artwork.nodes.forEach(node => {
      if (node.recordId === art) {
        return ({
          Primary_Artist__REQUIRED_: artist,
          Name: title,
          Medium: media,
          Theme: themes,
        } = node.data)
      }

      artistByName = artist[0]
      // converts artist ID to name
      dataObjCopy.artists.nodes.forEach(node => {
        if (node.recordId === artistByName) {
          artistByName = node.data.Name
        }
      })
      // converts returned media array from IDs to names
      mediaCopy = [] // empty the array before pushing new items to it
      media.forEach((medium, i) => {
        dataObjCopy.mediums.nodes.forEach(node => {
          if (node.recordId === medium) {
            mediaCopy.push(node.data.Name)
          }
        })
      })
      // converts returned themes array from IDs to names
      themesCopy = [] // empty the array before pushing new items to it
      themes?.forEach((theme, i) => {
        dataObjCopy.themes.nodes.forEach(node => {
          if (node.recordId === theme) {
            themesCopy.push(node.data.Name)
          }
        })
      })
    })

    console.log(themesCopy)

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

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">
        {selectedFilter.filterType === "influence" ? "Artists" : "Artwork"}
      </h3>
      {renderedArtistsAndArtwork}
    </div>
  )
}

export default ArtistsAndArtwork
