/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/react"
import { useFilterContext } from "./context/FilterContext"
import { useNodeContext } from "./context/NodeContext"
import { getMetadataByFilterId } from "../utils"
import DesktopNav from "./DesktopNav"
import MobileNav2 from "./MobileNav2"
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

  const showDropdown = element => {
  console.log('hay')
    var event = document?.createEvent("MouseEvents")
    event.initMouseEvent("mousedown", true, true, window)
    element.dispatchEvent(event)
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

  const themes = []
  data?.themes?.nodes.map(el => {
    el.data.Artwork &&
      themes.push({
        id: el.recordId,
        name: el.data.Name,
      })
  })

  const mediums = []
  data?.mediums?.nodes.map(el => {
    el.data.Artwork &&
      mediums.push({
        id: el.recordId,
        name: el.data.Name,
      })
  })

  const influences = []
  data?.influences?.nodes.forEach(el => {
    el.data.Artist &&
      influences.push({
        id: el.recordId,
        name: el.data.Name,
      })
  })

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
          onClick={e => {
            showDropdown(document.getElementById(e.target.id))
          }}
        >
          <option value="">&#8213;</option>
          {options}
        </select>
      </li>
    )
  }

  return isMobile ? (
    <MobileNav2
      generateDropdown={generateDropdown}
      artists={artists}
      artwork={artwork}
      influences={influences}
      themes={themes}
      mediums={mediums}
      locations={locations}
    />
  ) : (
    <DesktopNav
      generateDropdown={generateDropdown}
      artists={artists}
      artwork={artwork}
      influences={influences}
      themes={themes}
      mediums={mediums}
      locations={locations}
    />
  )
}

export default Navigation
