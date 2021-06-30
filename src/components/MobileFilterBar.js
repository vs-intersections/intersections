import React, { useState } from "react"
import { IoMdArrowDropupCircle } from "react-icons/io"

const MobileFilterBar = ({
  artwork,
  artists,
  locations,
  themes,
  mediums,
  affiliations,
  generateDropdown,
  displayJoyride,
}) => {
  const [filterBarIsopen, setFilterBarIsopen] = useState(true)
  return (
    <div className="relative pt-12">
      <nav
        className={`bg-gray-100 relative overflow-hidden border-b border-orange mobile-nav ${
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
            {generateDropdown("affiliation", affiliations, "yellow")}
          </div>
        </ul>
      </nav>
      <div className="absolute w-full b-0 z-40 flex justify-center">
        <div
          className="w-40 relative"
          onClick={() =>
            displayJoyride
              ? alert(
                  "Click on the red beacon to continue. You must read through OR dismiss the tutorial before you can close the filter bar."
                )
              : setFilterBarIsopen(!filterBarIsopen)
          }
        >
          <div className="w-40 h-8 bg-orange rounded-b-lg flex items-center justify-center">
            <span>FILTERS</span>
            <div className="absolute w-7">
              <div
                className={`w-7 h-7 absolute bg-orange rounded-t-full transition-borderAndPosition -top-10 rounded-b-0 ${
                  !filterBarIsopen && "hidden"
                }`}
              ></div>
              <IoMdArrowDropupCircle
                className={`w-7 h-7 absolute fill-lightgray transform transition-rotate transition-borderAndPosition rotate-1 -top-10 ${
                  !filterBarIsopen && "hidden"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileFilterBar
