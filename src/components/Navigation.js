import React, { useContext } from "react"
// import { handleClickArtist } from "../utils/clickHandlers"
import FilterContext from "./context/FilterContext"

const Navigation = () => {
  const [selectedFilter, setSelectedFilter] = useContext(FilterContext)

  return (
    <nav className="bg-gray-100 pt-1 flex justify-center items-center relative">
      <ul className="flex items-center text-xs justify-evenly w-full">
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-lightGreen"
            onClick={() => setSelectedFilter("rec1jGlX4IHyhr35R")}
          >
            ARTIST
          </button>
        </li>
        <li>
          <button className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-orange">
            ARTWORK
          </button>
        </li>
        <li>
          <button className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-blue">
            LOCATION
          </button>
        </li>
        <li>
          <button className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-lightBlue">
            THEME
          </button>
        </li>
        <li>
          <button className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-pink">
            MEDIUM
          </button>
        </li>
        <li>
          <button className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-yellow">
            INFLUENCE
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
