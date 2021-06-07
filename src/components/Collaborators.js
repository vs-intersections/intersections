import React, { useContext } from "react"
import { getMetadataByFilterId, translateIdToName2 } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { DataContext } from "./context/DataContext"

const Collaborators = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)

  const { selectedFilter, setSelectedFilter } = useFilterContext()
  let metadata
  let collabArtists

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  // Working on getting collabs to show up in Artist sidebar
  if (selectedFilter.filterType === "artist") {
    let artistCollaborators = []
    dataObjCopy.artists.nodes.forEach(artist => {
      if (artist.data.Collaborated_On) {
        let needToAddToList = false
        artist.data.Collaborated_On.forEach(item => {
          metadata.data.Artwork?.forEach(artwork => {
            if (item === artwork) {
              needToAddToList = true
              return
            }
          })
        })
        needToAddToList &&
          artistCollaborators.push({
            name: artist.data.Name,
            id: artist.recordId,
            table: artist.table,
          })
      }
    })
    collabArtists = [...new Set(artistCollaborators)]
  }
  console.log(collabArtists)

  const { Collaborators: collabs } = metadata.data

  let collabNames = []

  if (selectedFilter.filterType === "artist") {
    dataObjCopy.artists.nodes.forEach(node => {
      if (node.isSelectedChild) {
        collabNames.push(node)
      }
    })
  } else if (collabs)
    collabNames = translateIdToName2(dataObjCopy, collabs, "artist")

  console.log(collabNames)

  const renderedData = collabNames?.map(item => (
    <>
      <span
        key={item.id || item.recordId}
        onClick={() => {
          console.log(item)
          setSelectedFilter({
            filterName: item.id || item.recordId,
            filterType: item.table,
          })
        }}
        className="text-lg underline-lightGreen"
      >
        {item.name || item.data.Name}
      </span>
      <br />
    </>
  ))

  const renderedData2 = collabArtists?.map(item => {
    return (
      <>
        <span
          key={item.id || item.recordId}
          onClick={() => {
            console.log(item)
            setSelectedFilter({
              filterName: item.id || item.recordId,
              filterType: "artist",
            })
          }}
          className="text-lg underline-lightGreen"
        >
          {item.name || item.data.Name}
        </span>
        <br />
      </>
    )
  })

  return (
    <div className="mb-16">
      {(collabNames?.length !== 0 || collabArtists?.length !== 0) && (
        <h3 className="pb-1 text-2xl font-bold mb-3.5">Collaborators</h3>
      )}
      {collabNames?.length !== 0 && renderedData}
      {collabArtists?.length !== 0 && renderedData2}
    </div>
  )
}

export default Collaborators
