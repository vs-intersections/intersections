import React from "react"
import { useFilterContext } from "./context/FilterContext"

// When clicking 'Buffalo Thunder", the Artist field is empty and media and themes are IDs instead of names

const ArtistsAndArtwork = ({ artwork, data }) => {
  const { selectedFilter } = useFilterContext()
  const renderedArtistsAndArtwork = artwork?.map(art => {
    // vars that will be assigned from destructuring
    let artist = [],
      title,
      media = [],
      themes = [],
      artistByName
    // look at artwork prop and see if any artworks match
    data.artwork.nodes.forEach(node => {
      if (node.recordId === art) {
        return (
          // deconstructed items from data
          ({
            Primary_Artist__REQUIRED_: artist,
            Name: title,
            Medium: media,
            Theme: themes,
          } = node.data)
        )
      }
      artistByName = artist[0]
      // converts artist ID to name
      data.artists.nodes.forEach(node => {
        if (node.recordId === artistByName) {
          artistByName = node.data.Name
        }
      })
      // converts returned media array from IDs to names
      media.forEach((medium, i) => {
        data.mediums.nodes.forEach(node => {
          if (node.recordId === medium) {
            media[i] = node.data.Name
            return media
          }
        })
      })
      // converts returned themes array from IDs to names
      themes.forEach((theme, i) => {
        data.themes.nodes.forEach(node => {
          if (node.recordId === theme) {
            themes[i] = node.data.Name
            return themes
          }
        })
      })
    })

    console.log(selectedFilter.filterType)

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
            {media.map((item, i) => {
              return (
                <span key={item}>
                  {item}
                  {media.length > i + 1 ? ", " : ""}
                </span>
              )
            })}
          </p>
          <p className="text-lg">
            <span className="font-bold">Theme: </span>
            {themes.map((item, i) => {
              return (
                <span key={item}>
                  {item}
                  {themes.length > i + 1 ? ", " : ""}
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
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Artwork</h3>
      {renderedArtistsAndArtwork}
    </div>
  )
}

export default ArtistsAndArtwork
