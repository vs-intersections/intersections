/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from "@emotion/react"
import { BsInfoCircleFill } from "react-icons/bs"
const InfoMenu = () => {
  const [infoMenuIsOpen, setInfoMenuIsOpen] = useState(false)
  return (
    <div
      className="bg-gray-200 h-10 w-full absolute bottom-0 z-50 flex justify-center items-center transition-transform"
      // css={css`
      //   height: ${infoMenuIsOpen ? "calc(100vh - 108px)" : "100%"};
      //   transform: ${infoMenuIsOpen ? "translateY(-100%)" : ""};
      // `}
    >
      <BsInfoCircleFill
        onClick={() => setInfoMenuIsOpen(!infoMenuIsOpen)}
        className="w-6 h-6 cursor-pointer"
      />
    </div>
  )
}

export default InfoMenu
