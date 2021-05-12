import React from "react"
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
  const { width } = useWindowSize()
  const IS_MOBILE_MD = width <= 770
  const IS_MOBILE_XS = width <= 450

  let numSlides = IS_MOBILE_XS ? 1 : IS_MOBILE_MD ? 2 : 3

  return (
    <Carousel
      className="bg-gray-200"
      plugins={[
        "arrows",
        "infinite",
        {
          resolve: slidesToShowPlugin,
          options: {
            numberOfSlides: numSlides,
          },
        },
      ]}
    >
      {/* <select name="testing" id="testing">
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
      </select>
      <select name="testing2" id="testing2">
        <option value="one">Animal</option>
        <option value="two">Hooman</option>
        <option value="three">Tree</option>
      </select>
      <select name="testing3" id="testing3">
        <option value="one">Chess</option>
        <option value="two">Monopoly</option>
        <option value="three">Checkers</option>
      </select> */}
      {generateDropdown("artist", artists, "lightGreen")}
      {generateDropdown("artwork", artwork, "orange")}
      {generateDropdown("location", locations, "blue")}
      {generateDropdown("theme", themes, "pink")}
      {generateDropdown("medium", mediums, "lightBlue")}
      {generateDropdown("influence", influences, "yellow")}
    </Carousel>
  )
}

export default MobileNav2
