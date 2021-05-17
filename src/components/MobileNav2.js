import React, { useState } from "react"
import { useWindowSize } from "../hooks"
import ArrowRight from "../../static/next.svg"
import ArrowLeft from "../../static/previous.svg"
import { IoMdArrowDropupCircle } from "react-icons/io"

const MobileNav2 = ({
  artwork,
  artists,
  locations,
  themes,
  mediums,
  influences,
  generateDropdown,
}) => {
  const [filterBarIsopen, setFilterBarIsopen] = useState(false)
  const { width } = useWindowSize()
  const IS_MOBILE_MD = width <= 770
  const IS_MOBILE_XS = width <= 450
  // let numSlides = IS_MOBILE_XS ? 1 : IS_MOBILE_MD ? 2 : 3

  return (
    <div className="relative">
      <nav
        className={`bg-gray-100 relative overflow-hidden border-b ${
          filterBarIsopen ? "h-48" : "h-0"
        } transition-height`}
      >
        <ul className="text-xs w-full">
          <div className="w-full h-16 flex space-between">
            {generateDropdown("artist", artists, "lightGreen")}
            {generateDropdown("artwork", artwork, "orange")}
          </div>
          <div className="w-full h-16 flex space-between">
            {generateDropdown("location", locations, "blue")}
            {generateDropdown("theme", themes, "pink")}
          </div>
          <div className="w-full h-16 flex space-between">
            {generateDropdown("medium", mediums, "lightBlue")}
            {generateDropdown("influence", influences, "yellow")}
          </div>
        </ul>
      </nav>
      <div className="absolute w-full b-0 z-10 flex justify-center">
        <div className="w-40 relative">
          <div className="w-40 h-8 bg-orange rounded-b-lg flex items-center justify-center">
            <span>FILTERS</span>
            <div
              className={`w-7 h-7 absolute right-2.5 top-0.75 bg-white rounded-full`}
            ></div>
            <IoMdArrowDropupCircle
              className={`w-7 h-7 absolute right-2.5 top-0.75 fill-lightgray transform transition-rotate ${
                !filterBarIsopen ? "rotate-180" : "rotate-1"
              }`}
              onClick={() => setFilterBarIsopen(!filterBarIsopen)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav2
