import React from "react"
import { Link } from "gatsby"
import menu from "../../static/menu-icon.svg"
const Header = ({ setIsOpen, isOpen, isMobile }) => {
  return (
    <header
      className={`px-2 md:px-6 lg:px-16 lg:py-4 py-2 flex flex-row items-center justify-between z-50 bg-white border-b`}
    >
      <div className="flex items-center justify-self-center">
        <img src="/vital-spaces-logo.svg" width={35} height={35} />
        <Link to="/">
          <span className="mx-3 uppercase tracking-wider flex">
            <span className="font-jaldi font-bold text-sm sm:text-base">
              Vital Spaces{" "}
            </span>
            <span className="text-sm sm:text-base">: Intersections</span>
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
