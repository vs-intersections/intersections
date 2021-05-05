/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from "@emotion/react"
import SidebarContent from "./SidebarContent"
import { IoMdArrowDropupCircle } from "react-icons/io"

const SidebarMobile = ({ data }) => {
  const [sideBarMobileIsOpen, setSideBarMobileIsOpen] = useState(false)
  // the 'top' value will determine the movement of the mobile sidebar
  return (
    <div
      className="pt-4 px-4 bg-gray-100 relative overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300 overflow-x-hidden transform transition-transform"
      css={css`
        height: ${sideBarMobileIsOpen ? "calc(90vh - 164px)" : "100%"};
        transform: ${sideBarMobileIsOpen ? "translateY(-90%)" : ""};
      `}
    >
      <IoMdArrowDropupCircle
        className={`w-7 h-7 absolute right-2.5 top-2.5 fill-lightgray transform transition-rotate ${
          sideBarMobileIsOpen ? "rotate-180" : "rotate-1"
        }`}
        onClick={() => setSideBarMobileIsOpen(!sideBarMobileIsOpen)}
      />
      <SidebarContent data={data} />
    </div>
  )
}

export default SidebarMobile
