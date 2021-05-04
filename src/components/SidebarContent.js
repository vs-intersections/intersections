import React from "react"
import SidebarArtist from "./SidebarArtist"
import SidebarArtwork from "./SidebarArtwork"
import SidebarLocation from "./SidebarLocation"
import SidebarMedium from "./SidebarMedium"
import SidebarTheme from "./SidebarTheme"
import SidebarInfluence from "./SidebarInfluence"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"

const SidebarContent = ({ data }) => {
  console.log(data)
  const { selectedFilter } = useFilterContext()
  let metadata

  if (selectedFilter.filterType) {
    metadata = getMetadataByFilterId(data, selectedFilter?.filterName)
    console.log(metadata)
  }

  // working on conditionally rendering props through dynamic naming
  // const tempName = selectedFilter?.filterType
  // const capitalizedFilterType =
  //   tempName.charAt(0).toUpperCase() + tempName.slice(1)
  // console.log(capitalizedFilterType)
  // const Monkey = {`Sidebar${capitalizedFilterType}`}

  const renderedComponent = () => {
    if (selectedFilter.filterType) {
      const {
        table,
        data: {
          Name: locationName,
          Artwork: artwork,
          Description: description,
        },
      } = metadata

      return selectedFilter.filterType === "artist" ? (
        <SidebarArtist data={data} />
      ) : selectedFilter.filterType === "artwork" ? (
        <SidebarArtwork data={data} />
      ) : selectedFilter.filterType === "location" ? (
        <SidebarLocation
          data={data}
          locationName={locationName}
          artwork={artwork}
          description={description}
          table={table}
        />
      ) : selectedFilter.filterType === "medium" ? (
        <SidebarMedium data={data} />
      ) : selectedFilter.filterType === "theme" ? (
        <SidebarTheme data={data} />
      ) : (
        <SidebarInfluence data={data} />
      )
    }
  }

  return (
    <div className="h-full pt-4 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300">
      {renderedComponent()}
    </div>
  )
}

export default SidebarContent
