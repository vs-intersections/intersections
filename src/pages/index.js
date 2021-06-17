import React, { useState, useEffect } from "react"
import LayoutMain from "../components/LayoutMain"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import SidebarMobile from "../components/SidebarMobile"
import Footer from "../components/Footer"
import { useSiteMetadata } from "../hooks"
import GraphAndSidebar from "../components/GraphAndSidebar"
import { Helmet } from "react-helmet"
import Lightbox from "../components/Lightbox"
import { useWindowSize } from "../hooks"

export default function Home() {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  const [isOpen, setIsOpen] = useState(false)
  const {
    siteMetadata: { description, title },
  } = useSiteMetadata()
  useEffect(() => {
    // sizes the height of mobile browsers to display the actual full height instead of the initial height
    // https://developers.google.com/web/updates/2016/12/url-bar-resizing
    const html = document.querySelector("html")
    html.style.height = "100vh"
    html.style.width = "100vw"
    html.style.position = "absolute"
    html.style.top = 0
    html.style.bottom = 0
    html.style.right = 0
    html.style.left = 0
  }, [])

  return (
    <>
      <Helmet title={title}>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Helmet>
      {IS_MOBILE && <MobileNav isOpen={isOpen} />}
      <LayoutMain>
        <Lightbox />
        <div className="h-full overflow-hidden flex flex-col">
          <Header
            className={`${IS_MOBILE ? "h-8" : "h-10"} flex-auto relative`}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Navigation isMobile={IS_MOBILE} />
          <div className="flex-auto">
            <main className="h-full relative">
              <div
                className={`absolute top-0 ${
                  IS_MOBILE ? "bottom-0" : "bottom-8"
                }`}
              >
                <GraphAndSidebar isMobile={IS_MOBILE} />
                {IS_MOBILE && <SidebarMobile />}
              </div>
              {!IS_MOBILE && <Footer />}
            </main>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}
