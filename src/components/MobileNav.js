import React from "react"
import { Link } from "gatsby"
function MobileNav({ isOpen, handleNavClick }) {
  return (
    <ul
      className={`mt-0 sm:mt-12 bg-white justify-center divide-y-2 flex align-middle items-center transition-all overflow-y-hidden l-0 w-full z-50 transition-height ${
        isOpen ? "h-full fixed" : "h-0 absolute"
      }`}
    >
      <div className="divide-y-2 text-xl sm:text-2xl md:text-3xl font-extrabold">
        <li className="py-6 sm:py-8 hover:underline tracking-widest text-center">
          <Link to="/" onClick={handleNavClick}>
            Home
          </Link>
        </li>
        <li className="py-6 sm:py-8 hover:underline tracking-widest text-center">
          <Link to="/about" onClick={handleNavClick}>
            About
          </Link>
        </li>
        <li className="py-6 sm:py-8 hover:underline tracking-widest text-center">
          <Link to="/videos" onClick={handleNavClick}>
            Videos
          </Link>
        </li>
        <li className="py-6 sm:py-8 hover:underline tracking-widest">
          <a
            href="https://www.vitalspaces.org/"
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-col items-center"
          >
            <span>Vital Spaces</span>
          </a>
        </li>
        <li className="py-6 sm:py-8 hover:underline tracking-widest">
          <a
            href="https://maidagoods.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-col items-center"
          >
            <span>MAIDA</span>
          </a>
        </li>
        <li className="py-6 sm:py-8 hover:underline tracking-widest">
          <a
            href="https://www.warehouse21.org/"
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-col items-center"
          >
            <span>Warehouse 21</span>
          </a>
        </li>
      </div>
    </ul>
  )
}

export default MobileNav
