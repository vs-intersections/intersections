import React, { useRef, useEffect, useContext } from "react"
import SidebarArtist from "./SidebarArtist"
import SidebarArtwork from "./SidebarArtwork"
import SidebarLocation from "./SidebarLocation"
import SidebarMedium from "./SidebarMedium"
import SidebarTheme from "./SidebarTheme"
import SidebarInfluence from "./SidebarInfluence"
import { useWindowSize } from "../hooks"
import { useFilterContext } from "./context/FilterContext"
import { DataContext } from "./context/DataContext"

const SidebarContent = ({ elemHeight, bgColor }) => {
  const [data] = useContext(DataContext)
  const { selectedFilter } = useFilterContext()
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  const ref = useRef(null)

  useEffect(() => {
    ref.current.scrollTo(0, 0)
  }, [elemHeight, selectedFilter])

  const renderedComponent = () => {
    if (selectedFilter.filterType) {
      return selectedFilter.filterType === "artist" ? (
        <SidebarArtist data={data} />
      ) : selectedFilter.filterType === "artwork" ? (
        <SidebarArtwork data={data} />
      ) : selectedFilter.filterType === "location" ? (
        <SidebarLocation data={data} />
      ) : selectedFilter.filterType === "medium" ? (
        <SidebarMedium data={data} />
      ) : selectedFilter.filterType === "theme" ? (
        <SidebarTheme data={data} />
      ) : (
        <SidebarInfluence data={data} />
      )
    } else {
      return <p className="text-center">Choose a filter or click a node</p>
    }
  }

  return (
    <div
      ref={ref}
      className={`h-full ${
        IS_MOBILE && "bg-opacity-10 bg-" + bgColor
      } pl-4 pt-4 pr-6 py-4 ${
        elemHeight < 100 ? "overflow-y-hidden" : "overflow-y-auto"
      } scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300`}
    >
      {renderedComponent()}
    </div>
  )
}

export default SidebarContent
