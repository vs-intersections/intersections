import React from "react"
import SidebarContent from "./SidebarContent"
import { IoMdArrowDropupCircle } from "react-icons/io"

const SidebarMobile = () => {
  return (
    <div className="pt-4 px-4 bg-gray-100 relative overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300 overflow-x-hidden">
      <IoMdArrowDropupCircle className="w-7 h-7 absolute right-2.5 top-2.5 fill-lightgray" />
      <SidebarContent />
    </div>
  )
}

export default SidebarMobile
