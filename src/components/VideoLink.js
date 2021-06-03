import React from "react"
import { useFilterContext } from "./context/FilterContext"

const VideoLink = ({ videoFilterLinkData }) => {
  const { selectedFilter, setSelectedFilter } = useFilterContext()

  selectedFilter && console.log(selectedFilter)

  const handleFilterLinkClick = item => {
    setSelectedFilter({
      filterName: item.recordId,
      filterType: item.table || "artwork",
    })
  }

  return (
    <span
      className="absolute w-full h-full z-50 cursor-pointer"
      onClick={() => handleFilterLinkClick(videoFilterLinkData)}
    ></span>
  )
}

export default VideoLink
