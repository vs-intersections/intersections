import React, { useState } from "react"
import { useWindowSize } from "../hooks"
import { useNodeContext } from "./context/NodeContext"
import { useFilterContext } from "./context/FilterContext"
import NodeGraph from "./NodeGraph/NodeGraph"
import classNames from "classnames"
const GraphAndSidebar = ({ data }) => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024
  const { selectedNode } = useNodeContext()
  const { selectedFilter } = useFilterContext()
  const [sidebarOpened, setSidebarOpened] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened)
  }

  let currentTheme = selectedNode?.table || selectedFilter?.filterType || "bg-orange"

  let tabClass = classNames({
    "bg-orange": currentTheme === "Artwork",
    "bg-lightGreen": currentTheme === "Artist",
  })

  return (
    <div className="w-full flex relative">
      <div
        className={`h-full transition-all duration-500 ${
          sidebarOpened ? "w-60vw" : "w-100vw"
        }`}
      >
        <NodeGraph data={data} />
      </div>
      {!IS_MOBILE && (
        <div className="relative flex-1">
          <div className={`h-full w-45vw absolute left-n3vw`}>
            <div
              className={`${tabClass} absolute top-10 left-0 w-3vw h-48  rounded-tl-lg rounded-bl-lg`}
              onClick={toggleSidebar}
            >
              <span className="transform -rotate-90 origin-center translate-y-24 block text-xl">
                {selectedNode?.table?.toUpperCase() || selectedFilter?.filterName}
              </span>
            </div>
            <div className="absolute left-3vw w-40vw h-full bg-gray-500">
              {JSON.stringify({selectedNode})}
              {JSON.stringify({selectedFilter})}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GraphAndSidebar
