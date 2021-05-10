import React from "react"
import Carousel from "@brainhubeu/react-carousel"
import "@brainhubeu/react-carousel/lib/style.css"
import ArrowRight from "../../static/next.svg"
import ArrowLeft from "../../static/previous.svg"

function MobileNav2({
  artwork,
  artists,
  locations,
  themes,
  mediums,
  influences,
  generateDropdown,
}) {
  return (
    <Carousel className="bg-gray-200" plugins={["arrows", "infinite"]}>
      {generateDropdown("artist", artists, "lightGreen")}
      {generateDropdown("artwork", artwork, "orange")}
      {generateDropdown("location", locations, "blue")}
      {generateDropdown("theme", themes, "pink")}
      {generateDropdown("influence", influences, "yellow")}
      {generateDropdown("medium", mediums, "lightBlue")}
    </Carousel>
  )
}

export default MobileNav2
