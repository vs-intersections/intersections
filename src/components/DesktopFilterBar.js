import React from "react"

const DeskTopFilterBar = ({
  artwork,
  artists,
  locations,
  themes,
  mediums,
  affiliations,
  generateDropdown,
}) => {
  return (
    <nav className="bg-gray-100 flex justify-center items-center relative pt-14 desktop-nav">
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

export default DeskTopFilterBar
