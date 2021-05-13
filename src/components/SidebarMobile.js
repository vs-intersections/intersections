/** @jsx jsx */
import React, { useRef, useEffect, useState } from "react"
import { css, jsx } from "@emotion/react"
import SidebarContent from "./SidebarContent"
import { IoMdArrowDropupCircle } from "react-icons/io"
import { useNodeContext } from "./context/NodeContext"
import { useFilterContext } from "./context/FilterContext"
import { useSidebarContext } from "./context/SidebarContext"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
const SidebarMobile = ({ data }) => {
  const { sideBarMobileIsOpen, setSideBarMobileIsOpen } = useSidebarContext()
  const { selectedNode } = useNodeContext()
  const { selectedFilter } = useFilterContext()

  const ref = useRef()
  useOnClickOutside(ref, () => setSideBarMobileIsOpen(false))

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
      className={`z-50 pl-4 pr-0 bg-gray-100 relative overflow-hidden transition-position transition-height ${
        sideBarMobileIsOpen
          ? "bottom-10 -top-full h-full"
          : "bottom-10 -top-14 h-14"
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

      <SidebarContent data={data} elemHeight={elemHeight} />
    </div>
  )
}

export default SidebarMobile
