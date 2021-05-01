import React, { useContext, useState, useEffect } from "react"
import { useFilterContext } from "./context/FilterContext"
import { useNodeContext } from "./context/NodeContext"

const Navigation = ({ data }) => {
  const { selectedFilter, setSelectedFilter } = useFilterContext()
  const { selectedNode } = useNodeContext()

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

  const generateDropdown = (filterType, arr, color) => {
    let options = arr.map(el => (
      <option value={el.id} key={el.id}>
        {el.name}
      </option>
    ))
    return (
      <li className="pb-2">
        <label className="block text-center lg:text-lg">
          {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
        </label>
        <div className={`mb-2 border-b-2 border-${color}`}></div>
        <select
          // Todo fix logic here
          value={
            // selectedNode?.id ||
            selectedFilter?.id
          }
          onChange={e => {
            setSelectedFilter(prev => ({
              filterName: e.target.value,
              filterType,
            }))
          }}
        >
          {options}
        </select>
      </li>
    )
  }

  return (
    <nav className="bg-gray-100 pt-1 flex justify-center items-center relative">
      <ul className="flex items-center text-xs justify-evenly w-full">
        {generateDropdown("artist", artists, "lightGreen")}
        {generateDropdown("artwork", artwork, "orange")}
        {generateDropdown("location", locations, "blue")}
        {selectedFilter.id}
        {generateDropdown("theme", themes, "pink")}
        {generateDropdown("medium", mediums, "lightBlue")}
        {generateDropdown("influence", influences, "yellow")}
      </ul>
    </nav>
  )
}

export default Navigation
