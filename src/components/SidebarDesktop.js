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
        bottom: 366%;
        @media (min-width: 768px) {
          font-size: 16px;
          line-height: 32px;
          bottom: 18.5rem;
          bottom: 366%;
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
        Whether you are looking to refinance, purchase or renovate – we’ve got
        you covered! <br />
        <br /> Don’t be afraid to reach out If you have questions or need some
        guidance, simply complete the contact me form below. You are also free
        to email me directly, text me or send me a message via social media. No
        matter what, we will do our best to answer your questions in a timely
        manner. We want to hear from you!
      </p>
    </div>
  )
}

export default SidebarDesktop
