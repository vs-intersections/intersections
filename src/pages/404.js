import React, { useState } from "react"
import { Link } from "gatsby"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useWindowSize } from "../hooks"

const NotFound = () => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <div>
      {IS_MOBILE && (
        <MobileNav isOpen={isOpen} handleNavClick={handleNavClick} />
      )}
      <div className="h-full overflow-x-hidden flex flex-col">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="w-full">
          <h1>Well this isn't good....</h1>
          <h3>You've reached a place that shouldn't exist</h3>
          <h3>
            You should go back{" "}
            <Link to="/">
              <span className="uppercase underline">home</span>
            </Link>
          </h3>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default NotFound
