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
            onClick={() => setSelectedFilter("rec1jGlX4IHyhr35R")}
          >
            ARTIST
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-orange"
            onClick={() => setSelectedFilter("recLpR2bY2fV2iTzN")}
          >
            ARTWORK
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-blue"
            onClick={() => setSelectedFilter("recgKDeImSD3gw0cu")}
          >
            LOCATION
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-lightBlue"
            onClick={() => setSelectedFilter("rec9y2JnU59iEAkJ9")}
          >
            THEME
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-pink"
            onClick={() => setSelectedFilter("rec9cbZXkPJxOViEY")}
          >
            MEDIUM
          </button>
        </li>
        <li>
          <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-yellow"
            onClick={() => setSelectedFilter("rec3NKKGDbIaVJ641")}
          >
            INFLUENCE
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
