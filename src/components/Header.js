import React from "react"
import { Link } from "gatsby"
import menu from "../../static/menu-icon.svg"
const Header = ({ setIsOpen, isOpen }) => {
  return (
    <header
      className={`px-2 md:px-6 lg:px-16 lg:py-4 py-2 flex flex-row items-center justify-between z-50 bg-white border-b fixed w-full`}
    >
      <div className="flex items-center justify-self-center">
        <Link to="/">
          <span className="mx-3 uppercase tracking-wider flex items-center">
            <div className="font-bold text-xs xs:text-sm sm:text-base inline-block">
              Intersections:{" "}
            </div>
            <div className="text-xs xs:text-sm sm:text-base inline-block ml-2">
              Vital Spaces, Maida, Warehouse 21
            </div>
          </span>
        </Link>
      </div>
      <ul className="hidden space-x-16 lg:flex justify-between uppercase">
        <li className="hover:text-yellow-600 tracking-widest">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-yellow-600 tracking-widest">
          <Link to="/videos">Videos</Link>
        </li>
        <li className="hover:text-yellow-600 tracking-widest">
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="md:block lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={menu} alt="" className="h-6" />
        </button>
      </div>
    </header>
  )
}

export default Header
