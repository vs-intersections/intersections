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

  const locations = []
  data?.locations?.nodes.forEach(el => {
    el.data.Artwork &&
      locations.push({
        id: el.recordId,
        name: el.data.Name,
      })
  })

  const themes = data?.themes?.nodes.map(el => ({
    id: el.recordId,
    name: el.data.Name,
  }))

  const mediums = data?.mediums?.nodes.map(el => ({
    id: el.recordId,
    name: el.data.Name,
  }))

  const influences = data?.influences?.nodes.map(el => ({
    id: el.recordId,
    name: el.data.Name,
  }))

  const artistsDropdown = artists.map(el => (
    <option value={el.id} key={el.id}>
      {el.name}
    </option>
  ))

  const artworkDropdown = artwork.map(el => (
    <option value={el.id} key={el.id}>
      {el.name}
    </option>
  ))

  const locationsDropdown = locations.map(el => (
    <option value={el.id} key={el.id}>
      {el.name}
    </option>
  ))

  const themesDropdown = themes.map(el => (
    <option value={el.id} key={el.id}>
      {el.name}
    </option>
  ))

  const mediumsDropdown = mediums.map(el => (
    <option value={el.id} key={el.id}>
      {el.name}
    </option>
  ))

  const influencesDropdown = influences.map(el => (
    <option value={el.id} key={el.id}>
      {el.name}
    </option>
  ))

  const generateDropdown = (filterType, dropdownFunc, color) => {
    return (
      <li>
        <label className="block text-center lg:text-lg">
          {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
        </label>
        <select
          value={selectedFilter.id}
          onChange={e => {
            setSelectedFilter({
              filterName: e.target.value,
              filterType,
            })
          }}
        >
          {dropdownFunc}
        </select>
        <div className={`border-b-2 border-${color}`}></div>
      </li>
    )
  }

  return (
    <nav className="bg-gray-100 pt-1 flex justify-center items-center relative">
      <ul className="flex items-center text-xs justify-evenly w-full">
        {generateDropdown("artists", artistsDropdown, "lightGreen")}
        {generateDropdown("artwork", artworkDropdown, "orange")}
        {generateDropdown("location", locationsDropdown, "blue")}
        {generateDropdown("theme", themesDropdown, "pink")}
        {generateDropdown("medium", mediumsDropdown, "lightBlue")}
        {generateDropdown("influence", influencesDropdown, "yellow")}
      </ul>
    </nav>
  )
}

export default Navigation
