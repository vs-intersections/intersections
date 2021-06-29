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
      content: `Welcome to Intersections, a citywide group art exhibition taking place in public spaces across Santa Fe and on this interactive website! If you are viewing this website on a mobile device, we highly encourage you to check out the desktop version, which includes a data visualization. Organized by Vital Spaces, MAIDA, and Warehouse 21.`,
    },
    {
      target: `.artist-dropdown`,
      content: `Use the Artist filter to find artists that are featured in Intersections.`,
    },
    {
      target: `.artwork-dropdown`,
      content: `Use the Artwork filter to explore artwork that is featured here and banners and posters throughout the city of Santa Fe.`,
    },
    {
      target: `.location-dropdown`,
      content: `Use the Location filter to see where Intersections art is being shown in Santa Fe.`,
    },
    {
      target: `.theme-dropdown`,
      content: `Use the Theme filter to explore how artwork intersects by theme.`,
    },
    {
      target: `.medium-dropdown`,
      content: `Use the Medium filter to explore how artwork intersects by medium.`,
    },
    {
      target: `.affiliation-dropdown`,
      content: `Use the Affiliation filter to see how artists are connected by affiliations and community.`,
    },
    {
      target: `.node-area`,
      content: `If you are viewing this website on a desktop, you can click the Artist or Artwork nodes to explore artists and artwork featured in this exhibition. When you select a filter, the relevant connections will light up here.`,
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

  const handleNavClick = () => {
    setIsOpen(false)
  }
  const [displayJoyride, setDisplayJoyride] = useState(true)
  return (
    <>
      <Helmet title={title}>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Helmet>
      {IS_MOBILE && (
        <MobileNav isOpen={isOpen} handleNavClick={handleNavClick} />
      )}
      <LayoutMain>
        <div className="h-full overflow-hidden flex flex-col">
          {displayJoyride && (
            <Joyride
              callback={data =>
                (data.action === "close" || data.action === "reset") &&
                setDisplayJoyride(false)
              }
              steps={steps}
              continuous={true}
              showSkipButton={true}
              styles={{
                options: { zIndex: 40, beaconSize: IS_MOBILE ? 50 : 70 },
              }}
            />
          )}
          <Lightbox />
          <Header
            className={`${IS_MOBILE ? "h-8" : "h-10"} flex-auto relative`}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Navigation
            className="navigation"
            isMobile={IS_MOBILE}
            displayJoyride={displayJoyride}
          />
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
