/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from "@emotion/react"
import { BsInfoCircleFill } from "react-icons/bs"
const InfoMenu = () => {
  const [infoMenuIsOpen, setInfoMenuIsOpen] = useState(false)
  return (
    <div
      className="bg-gray-200 h-screen z-50 flex justify-center transition-transform"
      css={css`
      height: ${infoMenuIsOpen ? "calc(100vh - 64px)" : "100%"};
      transform: ${infoMenuIsOpen ? "translateY(-100%)" : ""};
      `}
    >
      <BsInfoCircleFill onClick={() => setInfoMenuIsOpen(!infoMenuIsOpen)} className="w-6 h-6 cursor-pointer mt-3" />
    </div>
  )
}

export default InfoMenu
