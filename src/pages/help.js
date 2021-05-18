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
      {IS_MOBILE && <MobileNav isOpen={isOpen} />}
      <div className="h-full overflow-x-hidden flex flex-col">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="w-full">
          <h1>How To Page</h1>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Help
