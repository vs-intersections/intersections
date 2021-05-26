/** @jsx jsx */
import React, { useContext } from "react"
import { css, jsx } from "@emotion/react"
import { useFilterContext } from "./context/FilterContext"
import { useNodeContext } from "./context/NodeContext"
import { DataContext } from "./context/DataContext"
import DesktopNav from "./DesktopNav"
import MobileNav2 from "./MobileNav2"

const Navigation = ({ isMobile }) => {
  const [data] = useContext(DataContext)
  const { selectedFilter, setSelectedFilter } = useFilterContext()
  const { selectedNode, setSelectedNode } = useNodeContext()

  const dataCopy = Object.assign({}, data)

  const handleSelect = e => {
    if (e.target.value === "―") {
      return
    }
    setSelectedNode(e.target.id)
    setSelectedFilter({
      filterName: e.target.value,
      filterType: e.target.id,
    })
  }

  const artists = dataCopy?.artists?.nodes.map(el => ({
    id: el.recordId,
    name: el.data.Name,
  }))

  const artwork = dataCopy?.artwork?.nodes.map(el => ({
    id: el.recordId,
    name: el.data.Name,
  }))

  const locations = []
  dataCopy?.locations?.nodes.forEach(el => {
    el.data.Artwork &&
      locations.push({
        id: el.recordId,
        name: el.data.Name,
      })
  })

  const themes = []
  dataCopy?.themes?.nodes.map(el => {
    el.data.Artwork &&
      themes.push({
        id: el.recordId,
        name: el.data.Name,
      })
  })

  const mediums = []
  dataCopy?.mediums?.nodes.map(el => {
    el.data.Artwork &&
      mediums.push({
        id: el.recordId,
        name: el.data.Name,
      })
  })

  const influences = []
  dataCopy?.influences?.nodes.forEach(el => {
    el.data.Artist &&
      influences.push({
        id: el.recordId,
        name: el.data.Name,
      })
  })

  const generateDropdown = (filterType, arr, color) => {
    let options = arr.map(el => {
      let shortenedName = el.name
      shortenedName =
        shortenedName.length > 30
          ? shortenedName.slice(0, 30) + "..."
          : shortenedName
      return (
        <option value={el.id} key={el.id}>
          {shortenedName}
        </option>
      )
    })
    const filterTitle =
      filterType.slice(0, 1).toUpperCase() + filterType.slice(1)
    return (
      <li
        className={`p-2 mx-auto ${
          isMobile ? "w-32" : "max-w-dropdown"
        } inline-block transition-colors duration-500 bg-opacity-40 ${
          selectedFilter.filterType === filterType ? "bg-" + color : ""
        }`}
      >
        <label className={`block flex justify-center items-center lg:text-lg`}>
          {filterTitle}
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
          <option>―</option>
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
      className="h-18 flex-auto"
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
