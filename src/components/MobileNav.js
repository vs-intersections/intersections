/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/react"

function MobileNav({ isOpen }) {
  return (
    <ul
      className={`flex flex-col justify-center align-middle items-center transform transition-transform`}
      css={css`
        color: blue;
        height: ${isOpen ? "calc(100vh - 64px)" : "0px"};
        display: ${isOpen ? "visible" : "none"};
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 49;
        background-color: pink;
        animation: fade-in 1s;
        transition-timing-function: ease-in-out;
      `}
    >
      <li className="hover:text-yellow-600 tracking-widest flex flex-col items-center">
        <span>Vital Spaces</span>

        <span>Main Site</span>
      </li>
      <li className="hover:text-yellow-600 tracking-widest">Videos</li>
      <li className="hover:text-yellow-600 tracking-widest">About</li>
      <li className="hover:text-yellow-600 tracking-widest">Help</li>
    </ul>
  )
}

export default MobileNav
