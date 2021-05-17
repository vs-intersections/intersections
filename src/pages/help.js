import React, { useState } from "react"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useWindowSize } from "../hooks"

const Help = () => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <MobileNav isOpen={isOpen} />
      <div className="grid grid-rows-videosPageMobile lg:grid-rows-videosPageLg">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="w-full border-t border-gray-300">
          <h1>How To Page</h1>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Help
