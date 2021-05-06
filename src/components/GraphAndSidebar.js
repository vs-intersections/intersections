import React, { useState, useRef } from "react"
import { useWindowSize, useOnClickOutside } from "../hooks"
import { useNodeContext } from "./context/NodeContext"
import { useFilterContext } from "./context/FilterContext"
import { useSidebarContext } from "./context/SidebarContext"
import { titleCase } from "../utils"
import { getMetadataByFilterId } from "../utils"
import { BsInfoCircle } from "react-icons/bs"
import NodeGraph from "./NodeGraph/NodeGraph"
import classNames from "classnames"
import SidebarContent from "./SidebarContent"
const GraphAndSidebar = ({ data }) => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024
  const { selectedNode } = useNodeContext()
  const { selectedFilter } = useFilterContext()
  const { sidebarIsOpened, setSidebarIsOpened } = useSidebarContext()
  const toggleSidebar = () => {
    setSidebarIsOpened(!sidebarIsOpened)
  }
  const ref = useRef()
  // useOnClickOutside(ref, () => setSidebarIsOpened(false))

  let currentTheme =
    selectedFilter?.filterType?.toLowerCase() ||
    selectedNode?.table?.toLowerCase()
  let tabClass = classNames({
    orange: currentTheme === "artwork",
    lightGreen: currentTheme === "artist",
    blue: currentTheme === "location",
    pink: currentTheme === "theme",
    lightBlue: currentTheme === "medium",
    darkGreen: currentTheme === "influence",
  })

  return (
    <div className="w-full flex relative">
      {/* Only show the info box if there viewport is not mobile 
      AND there is a selected Node name
       OR data AND selectedFilter FilterName  */}
      {!IS_MOBILE &&
        (selectedNode?.name || (data && selectedFilter?.filterName)) && (
          <div
            className={`transition-all duration-500 ${
              sidebarIsOpened ? "w-60vw" : "w-100vw"
            } h-20 absolute flex justify-center items-center`}
          >
            <div
              className={`w-80 h-12 text-gray-500 border-2 rounded border-${tabClass} bg-white flex cursor-pointer hover:bg-${tabClass} hover:text-gray-900 transition-colors duration-500`}
              onClick={toggleSidebar}
            >
              <div
                ref={ref}
                className="w-10/12 text-center text-current flex justify-center items-center"
              >
                {selectedNode?.name ||
                  getMetadataByFilterId(data, selectedFilter?.filterName)?.data
                    ?.Name}
              </div>
              <div className="w-2/12 flex justify-center items-center">
                <BsInfoCircle className="w-full h-full p-2 fill-current text-current" />
              </div>
            </div>
          </div>
        )}
      <div
        className={`h-full transition-all duration-500 ${
          sidebarIsOpened ? "w-60vw" : "w-100vw"
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
                {titleCase(selectedFilter?.filterType) ||
                  titleCase(selectedNode?.table)}
              </span>
            </div>
            <div
              className={`absolute left-3vw w-40vw h-full bg-${tabClass} bg-opacity-10`}
            >
              {data && <SidebarContent data={data} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GraphAndSidebar
