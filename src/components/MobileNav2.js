import React, { useState } from "react"
import Carousel, {
  arrowsPlugin,
  slidesToShowPlugin,
} from "@brainhubeu/react-carousel"
import "@brainhubeu/react-carousel/lib/style.css"
import { useWindowSize } from "../hooks"
import ArrowRight from "../../static/next.svg"
import ArrowLeft from "../../static/previous.svg"

const MobileNav2 = ({
  artwork,
  artists,
  locations,
  themes,
  mediums,
  influences,
  generateDropdown,
}) => {
  const [open, setOpen] = useState(false)
  const { width } = useWindowSize()
  const IS_MOBILE_MD = width <= 770
  const IS_MOBILE_XS = width <= 450
  // let numSlides = IS_MOBILE_XS ? 1 : IS_MOBILE_MD ? 2 : 3

  return (
    <nav className="bg-gray-100 relative h-48">
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
  )
}

export default MobileNav2
