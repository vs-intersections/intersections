import React from "react"

const Footer = () => {
  return (
    <div className="absolute bottom-0 h-8 flex items-center justify-center bg-gray-100 w-full">
      &copy;{new Date().getFullYear()} Vital Spaces - All Rights Reserved
    </div>
  )
}

export default Footer
