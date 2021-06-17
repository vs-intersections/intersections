import React, { useRef, useEffect, useState, useContext } from "react"
import SidebarContent from "./SidebarContent"
import { useNodeContext } from "./context/NodeContext"
import { useFilterContext } from "./context/FilterContext"
import { useSidebarContext } from "./context/SidebarContext"
import { DataContext } from "./context/DataContext"
import classNames from "classnames"

const SidebarMobile = () => {
  const [data] = useContext(DataContext)
  const { sideBarMobileIsOpen, setSideBarMobileIsOpen } = useSidebarContext()
  const { selectedNode } = useNodeContext()
  const { selectedFilter } = useFilterContext()

  const ref = useRef()

  let currentTheme =
    selectedFilter?.filterType?.toLowerCase() ||
    selectedNode?.table?.toLowerCase()
  let tabClass = classNames({
    orange: currentTheme === "artwork",
    lightGreen: currentTheme === "artist",
    blue: currentTheme === "location",
    pink: currentTheme === "theme",
    lightBlue: currentTheme === "medium",
    yellow: currentTheme === "affiliation",
  })

  const [elemHeight, setElemHeight] = useState(0)

  useEffect(() => {
    setElemHeight(ref.current.getBoundingClientRect().height)
  })

  const NO_NODE_OR_FILTER_SELECTED =
    !selectedNode &&
    selectedFilter.filterName === "" &&
    selectedFilter.filterType === ""

  return (
    <div
      ref={ref}
      className={`z-30 pr-0 relative bg-gray-100 overflow-hidden transition-position transition-height bottom-10 -top-full h-full`}
    >
      {!NO_NODE_OR_FILTER_SELECTED && (
        <div>
          <div
            className={`w-full h-8 absolute`}
            onClick={() =>
              !NO_NODE_OR_FILTER_SELECTED &&
              setSideBarMobileIsOpen(!sideBarMobileIsOpen)
            }
          ></div>
        </div>
      )}
      <SidebarContent data={data} elemHeight={elemHeight} bgColor={tabClass} />
    </div>
  )
}

export default SidebarMobile
