/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from "@emotion/react"
import { BsInfoCircleFill } from "react-icons/bs"
const InfoMenu = ({ changeInfobar }) => {
  const [infoMenuIsOpen, setInfoMenuIsOpen] = useState(false)

  const handleClick = () => {
    changeInfobar()
    setInfoMenuIsOpen(!infoMenuIsOpen)
  }

  return (
    <div
      className={`bg-gray-200 bottom-0 w-full absolute ${
        infoMenuIsOpen ? "h-full" : "h-10"
      } z-50 transition-height ease-in-out overflow-hidden`}
      // css={css`
      //   height: ${infoMenuIsOpen ? "calc(100vh - 108px)" : "100%"};
      //   transform: ${infoMenuIsOpen ? "translateY(-100%)" : ""};
      // `}
    >
      <div className="flex justify-center items-center h-10">
        <BsInfoCircleFill
          onClick={handleClick}
          className="w-6 h-6 cursor-pointer"
        />
      </div>
      <div className="text-center">SIDEBAR INFO GOES HERE</div>
    </div>
  )
}

export default InfoMenu
