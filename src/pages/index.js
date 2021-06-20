import React, { useState, useEffect } from "react"
import Joyride from "react-joyride"
import Lightbox from "../components/Lightbox"
import LayoutMain from "../components/LayoutMain"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import SidebarMobile from "../components/SidebarMobile"
import Footer from "../components/Footer"
import { useSiteMetadata } from "../hooks"
import GraphAndSidebar from "../components/GraphAndSidebar"
import { Helmet } from "react-helmet"
import { useWindowSize } from "../hooks"

export default function Home() {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024
  const initialSteps = [
    {
      target: `nav`,
      content:
      `Welcome to Intersections, a citywide group of art exhibitions taking place 
      in public spaces across Santa Fe and on this interactive website! 
      Organized by Vital Spaces, MAIDA and Warehouse 21.`,
    },
    {
      target: `.artist-dropdown`,
      content:
      `Use the Artist filter to find artists that are featured in Intersections.`,
    },
    {
      target: `.artwork-dropdown`,
      content:
      `Use the Artwork filter to explore artwork that is on exhibit throughout the city of Santa Fe.`,
    },
    {
      target: `.location-dropdown`,
      content:
      `Use the Location filter to find locations throughout Santa Fe that have artwork you would like to visit.`,
    },
    {
      target: `.theme-dropdown`,
      content:
      `Use the Theme filter to explore how artwork intersects by theme.`,
    },
    {
      target: `.medium-dropdown`,
      content:
      `Use the Medium filter to explore artwork by various mediums.`,
    },
    {
      target: `.affiliation-dropdown`,
      content:
      `Use the Affiliation filter to see how artists are connected by affiliations and community.`,
    },
    {
      target: `.node-area`,
      content:
      `If you are viewing this website on a desktop, you can click the Artist
       or Artwork nodes to explore artists and artwork featured in this exhibition.`,
    },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [steps, setSteps] = useState(initialSteps)
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
        <div className="h-full overflow-hidden flex flex-col">
          <Joyride steps={steps} continuous={true} showSkipButton={true} />
          <Lightbox />
          <Header
            className={`${IS_MOBILE ? "h-8" : "h-10"} flex-auto relative`}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Navigation className="navigation" isMobile={IS_MOBILE} />
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
