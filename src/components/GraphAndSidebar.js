import React, { useState } from "react"
import { useWindowSize } from "../hooks"
import { useNodeContext } from "./context/NodeContext"
import { useFilterContext } from "./context/FilterContext"
import { getMetadataByFilterId } from "../utils"
import { BsInfoCircle } from "react-icons/bs"
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


  let currentTheme =
    selectedFilter?.filterType?.toLowerCase() ||
    selectedNode?.table?.toLowerCase()

  let tabClass = classNames({
    orange: currentTheme === "artwork",
    lightGreen: currentTheme === "artist",
    blue: currentTheme === "location",
    pink: currentTheme === "theme",
    lightBlue: currentTheme === "medium",
    yellow: currentTheme === "influence",
  })

  return (
    <div className="w-full flex relative">
      {!IS_MOBILE && (
        <div
          className={`transition-all duration-500 ${
            sidebarOpened ? "w-60vw" : "w-100vw"
          } h-20 absolute flex justify-center items-center`}
        >
          <div
            className={`w-80 h-12 border-2 rounded border-${tabClass} bg-white flex`}
          >
            <div className="w-10/12 text-center text-gray-500 flex justify-center items-center">
              {selectedNode?.name || getMetadataByFilterId(data, selectedFilter?.filterName).data.Name}
            </div>
            <div className="w-2/12 flex justify-center items-center cursor-pointer" onClick={toggleSidebar}>
              <BsInfoCircle className="w-full h-full p-2 fill-current text-gray-500" />
            </div>
          </div>
        </div>
      )}
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
              className={`bg-${tabClass} absolute top-10 left-0 w-3vw h-48 rounded-tl-lg rounded-bl-lg`}
              onClick={toggleSidebar}
            >
              <span className="transform -rotate-90 origin-center translate-y-24 block text-xl">
                {selectedFilter?.filterType ||
                  selectedNode?.table?.toUpperCase()}
              </span>
            </div>
            <div className="absolute left-3vw w-40vw h-full bg-orangeWhite">
              {JSON.stringify({ selectedNode })}
              {JSON.stringify({ selectedFilter })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GraphAndSidebar
