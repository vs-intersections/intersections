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

  const generateDropdown = (filterType, dropdownFunc) => {
    return (
      <li>
        <select
          value={selectedFilter.id}
          onChange={e => {
            setSelectedFilter({
              filterName: e.target.value,
              filterType,
            })
          }}
        >
          <label>
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </label>
          {dropdownFunc}
        </select>
      </li>
    )
  }

  return (
    <nav className="bg-gray-100 pt-1 flex justify-center items-center relative">
      <ul className="flex items-center text-xs justify-evenly w-full">
        {generateDropdown("artists", artistsDropdown)}
        {generateDropdown("artwork", artworkDropdown)}
        {generateDropdown("location", locationsDropdown)}
        {generateDropdown("theme", themesDropdown)}
        {generateDropdown("medium", mediumsDropdown)}
        {generateDropdown("influence", influencesDropdown)}
      </ul>
    </nav>
  )
}

export default Navigation
