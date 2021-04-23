import React from "react"
// import { handleClickArtist } from "../utils/clickHandlers"

const Navigation = () => {
  return (
    <nav className="bg-gray-100 pt-1 flex justify-center items-center relative">
      <ul className="flex items-center text-xs justify-evenly w-full">
        <li>
          <button>ARTIST</button>
        </li>
        <li>
          <button>ARTWORK</button>
        </li>
        <li>
          <button>LOCATION</button>
        </li>
        <li>
          <button>THEME</button>
        </li>
        <li>
          <button>MEDIUM</button>
        </li>
        <li>
          <button>INFLUENCE</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
