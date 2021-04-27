/** @jsx jsx */
import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { css, jsx } from "@emotion/react"

const SidebarDesktop = () => {
  const [sidebarBannerIsOpen, setSidebarBannerIsOpen] = useState(false)
  const toggleConnectBanner = () => {
    setSidebarBannerIsOpen(!sidebarBannerIsOpen)
  }

  let connectBannerClass = classNames({
    bannerIsOpen: sidebarBannerIsOpen,
    bannerIsClosed: !sidebarBannerIsOpen,
  })
  return (
    <div
      className={`${connectBannerClass} bg-yellow-500 pl-4 lg:pl-32 w-2/5 fixed z-10 bottom-0 relative right-10 overflow-x-visible`}
      id="#connect"
      css={css`
        color: rgba(0, 0, 0, 0.87);
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        position: absolute;
        top: 0;
        @media (min-width: 768px) {
          font-size: 16px;
          line-height: 32px;
        }
      `}
    >
      <div
        className={`flex items-center font-semibold  justify-between w-48 py-2 px-4 absolute cursor-pointer transform -rotate-90 absolute left-0`}
        css={css`
          top: 6.5rem;
          right: 10%;
          transform: rotate(-90);
          border-radius: 12px 12px 0px 0px;
          font-size: 16px;
        `}
        onClick={toggleConnectBanner}
      >
        INFO{" "}
      </div>
      <p className="py-4 mx-4">
        Dummy text? More like dummy thicc text, amirite? <br />
        <br /> You probably haven't heard of them kogi tattooed, jean shorts
        single-origin coffee salvia la croix. Locavore bespoke quinoa bicycle
        rights echo park vaporware, cliche chartreuse hoodie art party
        dreamcatcher. Lo-fi crucifix shaman health goth hot chicken pug
        williamsburg banh mi yr pok pok YOLO. Next level neutra meditation tofu.
        Quinoa art party marfa, green juice waistcoat hot chicken kitsch
        microdosing raclette tacos yuccie. Gastropub aesthetic pour-over fam.
        DIY swag before they sold out chillwave cliche.
      </p>
    </div>
  )
}

export default SidebarDesktop
