/** @jsx jsx */
import React, { useContext } from "react"
import { css, jsx } from "@emotion/react"
import Carousel, {
  arrowsPlugin,
  slidesToShowPlugin,
} from "@brainhubeu/react-carousel"
import "@brainhubeu/react-carousel/lib/style.css"
import { useWindowSize } from "../hooks"
import Popup from "reactjs-popup"
import { useFilterContext } from "./context/FilterContext"
const MobileNav2 = ({ mobileData }) => {
  const { width } = useWindowSize()
  const IS_MOBILE_MD = width <= 770
  const IS_MOBILE_XS = width <= 450
  let numSlides = IS_MOBILE_XS ? 1 : IS_MOBILE_MD ? 2 : 3
  const handleClick = e => {
    console.log("derp")
  }
  const { selectedFilter, setSelectedFilter } = useFilterContext()

  const Modal = ({ arr, title, color }) => {
    return (
    <Popup
      trigger={
        <button className={`inline-block underline-${color}`}>
          {title}{" "}
        </button>
      }
      modal
    >
      {close => (
        <div className="h-full bg-white w-60vw" onClick={close}>
          <div
            className="menu"
          >
            {arr.map(el => (
              <div
                className={`menu-item w-60vw bg-grey-500 underline-${color}`}
                id={el.id}
                onClick={() => {
                  console.log(title)
                  setSelectedFilter({ filterName: el.id, filterType: title })
                  close()
                }}
              >
                {el.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </Popup>
  )
}
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
      <Modal title="artist" arr={mobileData.artist} color="lightGreen" />
      <Modal title="artwork" arr={mobileData.artwork} color="orange" />
      <Modal title="location" arr={mobileData.location} color="blue" />
      <Modal title="theme" arr={mobileData.theme} color="pink" />
      <Modal title="medium" arr={mobileData.medium} color="lightBlue" />
      <Modal title="influence" arr={mobileData.influence} color="yellow" />

    </Carousel>
  )
}

export default MobileNav2
