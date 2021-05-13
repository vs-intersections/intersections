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
      className="bg-gray-200 h-18 flex-grow"
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
      {/* <div>
        <select
          name="testing"
          id="testing"
          onClick={console.log("clicked")}
          className="z-50"
        >
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
      </div>
      <div>
        <select
          name="testing"
          id="testing"
          onClick={console.log("clicked")}
          className="z-50"
        >
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
      </div>
      <div>
        <select
          name="testing"
          id="testing"
          onClick={console.log("clicked")}
          className="z-50"
        >
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
      </div> */}
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
