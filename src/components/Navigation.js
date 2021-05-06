import React from "react"
import { useFilterContext } from "./context/FilterContext"
import { useNodeContext } from "./context/NodeContext"
import { getMetadataByFilterId } from "../utils"

const Navigation = ({ data, isMobile }) => {
  const { selectedFilter, setSelectedFilter } = useFilterContext()
  const { selectedNode, setSelectedNode } = useNodeContext()

  const handleSelect = e => {
    setSelectedNode(e.target.id)
    setSelectedFilter({
      filterName: e.target.value,
      filterType: e.target.id,
    })
  }

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
    let options = arr.map(el => {
      return (
        <option value={el.id} key={el.id}>
          {el.name}
        </option>
      )
    })

    return (
      <li
        className={`p-2 max-w-dropdown transition-colors duration-500 bg-opacity-40 ${
          selectedFilter.filterType === filterType ? "bg-" + color : ""
        }`}
      >
        <label className={`block flex justify-center items-center lg:text-lg`}>
          {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
        </label>
        <div className={`mb-2 border-b-2 border-${color}`}></div>
        <select
          className="w-full"
          id={filterType}
          // Todo fix logic here
          value={
            // selectedNode?.id ||
            selectedFilter?.filterName
          }
          onChange={e => {
            handleSelect(e)
          }}
        >
          <option value="">&#8213;</option>
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
        {!isMobile && generateDropdown("location", locations, "blue")}
        {!isMobile && generateDropdown("theme", themes, "pink")}
        {!isMobile && generateDropdown("medium", mediums, "lightBlue")}
        {!isMobile && generateDropdown("influence", influences, "darkGreen")}
      </ul>
    </nav>
  )
}

export default Navigation
