/** @jsx jsx */
import React, { useRef } from "react"
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
  console.log(selectedFilter, selectedNode)

  const ref = useRef()
  useOnClickOutside(ref, () => setSideBarMobileIsOpen(false))

  const NO_NODE_OR_FILTER_SELECTED =
    !selectedNode &&
    selectedFilter.filterName === "" &&
    selectedFilter.filterType === ""

  return (
    <div
      ref={ref}
      className="pt-4 pl-4 pr-0 bg-gray-100 relative overflow-y-hidden scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300 overflow-x-hidden transform transition-transform"
      css={css`
        height: ${sideBarMobileIsOpen
          ? "calc(100vh - 64px)"
          : NO_NODE_OR_FILTER_SELECTED
          ? "40px"
          : "100%"};
        transform: ${sideBarMobileIsOpen && !NO_NODE_OR_FILTER_SELECTED
          ? "translateY(-60vh)"
          : NO_NODE_OR_FILTER_SELECTED
          ? "translateY(335%)"
          : ""};
      `}
    >
      <div
        className={`w-7 h-7 absolute right-2.5 top-2.5 bg-white rounded-full`}
      ></div>
      <IoMdArrowDropupCircle
        className={`w-7 h-7 absolute right-2.5 top-2.5 fill-lightgray transform transition-rotate ${
          sideBarMobileIsOpen ? "rotate-180" : "rotate-1"
        }`}
        onClick={() =>
          !NO_NODE_OR_FILTER_SELECTED &&
          setSideBarMobileIsOpen(!sideBarMobileIsOpen)
        }
      />

      <SidebarContent data={data} />
    </div>
  )
}

export default SidebarMobile
