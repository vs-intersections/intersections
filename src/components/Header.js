import React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <header className="container px-6 lg:px-24 flex flex-col md:flex-row items-center justify-center lg:justify-between">
      <div className="flex items-center">
        <img src="/vital-spaces-logo.svg" width={35} height={35} />
        <Link to="/">
          <span className="mx-3 uppercase tracking-wider">
            <span className="font-jaldi font-bold">Vital Spaces </span>:
            Intersections
          </span>
        </Link>
      </div>
      <ul className="hidden lg:flex space-x-6 items-center uppercase">
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
    </header>
  )
}

export default Header
