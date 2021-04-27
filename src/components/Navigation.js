import React, { useContext } from "react"
import FilterContext from "./context/FilterContext"

const Navigation = () => {
  const [selectedFilter, setSelectedFilter] = useContext(FilterContext)

  return (
    <nav className="bg-gray-100 pt-1 flex justify-center items-center relative">
      <ul className="flex items-center text-xs justify-evenly w-full">
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-lightGreen"
            onClick={() =>
              setSelectedFilter({
                filterName: "rec1jGlX4IHyhr35R",
                filterType: "artist",
              })
            } // Morgan Bernard
          >
            ARTIST
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-orange"
            onClick={() =>
              setSelectedFilter({
                filterName: "recLpR2bY2fV2iTzN",
                filterType: "artwork",
              })
            } // Artwork 1
          >
            ARTWORK
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-blue"
            onClick={() => setSelectedFilter("rec4vtVJRHYXcYyw1")} // Meow Wolf
          >
            LOCATION
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-lightBlue"
            onClick={() => setSelectedFilter("recS2uDVGjVosAS5e")} // abstract
          >
            THEME
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-pink"
            onClick={() => setSelectedFilter("recNSnjXAfAqvbB6b")} // oil paint
          >
            MEDIUM
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-yellow"
            onClick={() => setSelectedFilter("rec3NKKGDbIaVJ641")} // meditation
          >
            INFLUENCE
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
