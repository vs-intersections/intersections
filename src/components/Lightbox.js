import React, { useContext } from "react"
import { LightboxContext } from "./context/LightboxContext"
import { useFilterContext } from "./context/FilterContext"
import { getMetadataByFilterId } from "../utils"
import { DataContext } from "./context/DataContext"
import { GatsbyImage } from "gatsby-plugin-image"

const Lightbox = () => {
  const [data] = useContext(DataContext)
  const dataObjCopy = Object.assign({}, data)
  const { selectedFilter } = useFilterContext()

  let metadata

  if (selectedFilter?.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const [lightboxIsOpen, setLightboxIsOpen] = useContext(LightboxContext)

  const artworkImage =
    metadata?.data?.Image?.localFiles[0].childImageSharp.gatsbyImageData

  return (
    <div
      className={`absolute w-screen h-screen flex items-center justify-center z-60 ${
        !lightboxIsOpen && "hidden"
      }`}
    >
      <div
        className="absolute w-full h-full bg-gray-500 opacity-75"
        onClick={() => setLightboxIsOpen(false)}
      ></div>
      <div className="md:w-3/6 md:h-5/6 bg-black relative z-70">
        <div
          className="absolute md:-right-16 md:top-0 right-0 -top-16 w-16 h-16 bg-black text-white text-5xl flex items-center justify-center cursor-pointer"
          onClick={() => setLightboxIsOpen(false)}
        >
          &#10006;
        </div>
        <GatsbyImage
          className="w-full h-full opacity-100"
          image={artworkImage}
        />
      </div>
    </div>
  )
}

export default Lightbox
