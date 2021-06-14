import React, { useRef, useEffect, useState, useContext } from "react"
import SidebarContent from "./SidebarContent"
import { IoMdArrowDropupCircle } from "react-icons/io"
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
      className={`z-40 pr-0 relative bg-gray-100 overflow-hidden transition-position transition-height ${
        sideBarMobileIsOpen
          ? "bottom-10 -top-full h-full"
          : "bottom-10 -top-24 h-24"
      }`}
    >
      {!NO_NODE_OR_FILTER_SELECTED && (
        <div>
          <div
            className={`w-7 h-7 absolute right-2.5 top-1.5 bg-white rounded-full`}
          ></div>
          <IoMdArrowDropupCircle
            className={`w-7 h-7 absolute right-2.5 top-1.5 fill-lightgray transform transition-rotate ${
              sideBarMobileIsOpen ? "rotate-180" : "rotate-1"
            }`}
          />
          <div
            className={`w-full h-14 absolute`}
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
