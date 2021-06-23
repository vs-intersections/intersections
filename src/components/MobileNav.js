import React from "react"
import { Link } from "gatsby"
function MobileNav({ isOpen }) {
  return (
    <ul
      className={`mt-0 sm:mt-12 bg-white justify-center divide-y-2 flex align-middle items-center transition-all absolute overflow-y-hidden l-0 w-full z-50 transition-height ${
        isOpen ? "h-full" : "h-0"
      }`}
    >
      <div className="divide-y-2 text-2xl font-extrabold">
        <li className="py-8 hover:underline tracking-widest text-center">
          <Link to="/">Home</Link>
        </li>
        <li className="py-8 hover:underline tracking-widest">
          <a
            href="https://www.vitalspaces.org/"
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-col items-center"
          >
            <span>Vital Spaces</span>
            <span>Main Site</span>
          </a>
        </li>
        <li className="py-8 hover:underline tracking-widest text-center">
          <Link to="/videos">Videos</Link>
        </li>
        <li className="py-8 hover:underline tracking-widest text-center">
          <Link to="/about">About</Link>
        </li>
      </div>
    </ul>
  )
}

export default MobileNav
