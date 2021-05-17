/** @jsx jsx */
import React, { useRef, useEffect, useState } from "react"
import { css, jsx } from "@emotion/react"
import SidebarContent from "./SidebarContent"
import { IoMdArrowDropupCircle } from "react-icons/io"
import { useNodeContext } from "./context/NodeContext"
import { useFilterContext } from "./context/FilterContext"
import { useSidebarContext } from "./context/SidebarContext"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import classNames from "classnames"
const SidebarMobile = ({ data }) => {
  const { sideBarMobileIsOpen, setSideBarMobileIsOpen } = useSidebarContext()
  const { selectedNode } = useNodeContext()
  const { selectedFilter } = useFilterContext()

  const ref = useRef()
  // useOnClickOutside(ref, () => setSideBarMobileIsOpen(false))

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
      // css={css`
      //   height: ${sideBarMobileIsOpen
      //     ? "calc(100vh - 64px)"
      //     : "100%"};
      //   transform: ${sideBarMobileIsOpen
      //     ? "translateY(-60vh)"
      //     : "translateY(17vh)"};
      // `}
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
            onClick={() =>
              !NO_NODE_OR_FILTER_SELECTED &&
              setSideBarMobileIsOpen(!sideBarMobileIsOpen)
            }
          />
        </div>
      )}
      <SidebarContent data={data} elemHeight={elemHeight} bgColor={tabClass} />
    </div>
  )
}

export default SidebarMobile
