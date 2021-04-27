import React, { useContext, useState } from "react"
import FilterContext from "./context/FilterContext"

const Navigation = ({ data }) => {
  const [selectedFilter, setSelectedFilter] = useContext(FilterContext)

  // Selected Node
  const [selectedNode, setSelectedNode] = useState(null)

  // Artists
  const artists = data?.artists?.nodes.map(el => ({
    id: el.recordId,
    name: el.data.Name,
  }))

  const artwork = data?.artwork?.nodes.map(el => ({
    id: el.recordId,
    name: el.data.Name,
  }))

  const artistsDropdown = artists.map(el => (
    <option
      value={el.id}
      key={el.id}
    >
      {el.name}
    </option>
  ))

  const artworkDropdown = artwork.map(el => (
    <option
      value={el.id}
      key={el.id}
    >
      {el.name}
    </option>
  ))
  return (
    <nav className="bg-gray-100 pt-1 flex justify-center items-center relative">
      <ul className="flex items-center text-xs justify-evenly w-full">
        <li>
          <select
            value={selectedFilter.id}
            onChange={e => {
              setSelectedFilter({
                filterName: e.target.value,
                filterType: "artist",
              })
            }}
          >
            <label>Artist</label>
            {artistsDropdown}
          </select>
        </li>
        <li>

        <select
            value={selectedFilter.id}
            onChange={e => {
              setSelectedFilter({
                filterName: e.target.value,
                filterType: "artwork",
              })
            }}
          >
            <label>Artwork</label>
            {artworkDropdown}
          </select>
          {/* <button
            className="border-gray-500 rounded-sm border py-2 px-4 hover:bg-orange"
            onClick={() =>
              setSelectedFilter({
                id: "recLpR2bY2fV2iTzN",
                filterType: "artwork",
              })
            } // Artwork 1
          >
            ARTWORK
          </button> */}
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
