import React from "react"
import { useWindowSize } from "../hooks"

const Footer = () => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  return (
    <div
      className={`fixed bottom-0 h-8 flex items-center justify-center bg-gray-100 w-screen ${
        IS_MOBILE ? "text-sm" : ""
      }`}
    >
      &copy;{new Date().getFullYear()} Vital Spaces - All Rights Reserved
    </div>
  )
}

export default Footer
