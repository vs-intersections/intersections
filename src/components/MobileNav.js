/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/react"
import { Link } from "gatsby"
function MobileNav({ isOpen }) {
  return (
    <ul
      className={`mt-12 border-t bg-white justify-center divide-y-2 align-middle items-center transition-all text-3xl font-extrabold absolute overflow-y-hidden l-0 w-full z-50 transition-height ${
        isOpen ? "h-full" : "h-0"
      }`}
      // css={css`
      //   height: ${isOpen ? "calc(100vh - 64px)" : "0px"};
      //   position: absolute;
      //   bottom: ${isOpen ? "0" : "-100vh"};
      //   overflow-y: hidden;
      //   left: 0;
      //   width: 100%;
      //   z-index: 49;
      //   transition-timing-function: ease-in-out;
      // `}
    >
      <li className="py-8 hover:underline mt-24 tracking-widest">
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
      <li className="py-8 hover:underline tracking-widest text-center">
        <Link to="/help">Help</Link>
      </li>
    </ul>
  )
}

export default MobileNav
