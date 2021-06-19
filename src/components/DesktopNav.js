import React from "react"

const DesktopNav = ({
  artwork,
  artists,
  locations,
  themes,
  mediums,
  influences,
  affiliations,
  generateDropdown,
}) => {
  return (
    <nav className="bg-gray-100 flex justify-center items-center relative desktop-nav">
      <ul className="flex items-center text-xs justify-evenly w-full">
        {generateDropdown("artist", artists, "lightGreen")}
        {generateDropdown("artwork", artwork, "orange")}
        {generateDropdown("location", locations, "blue")}
        {generateDropdown("theme", themes, "pink")}
        {generateDropdown("medium", mediums, "lightBlue")}
        {generateDropdown("affiliation", affiliations, "yellow")}
      </ul>
    </nav>
  )
}

export default DesktopNav
