/** @jsx jsx */
import React, { useState, useEffect } from "react"
import { css, jsx } from "@emotion/react"
import LayoutMain from "../components/LayoutMain"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import SidebarMobile from "../components/SidebarMobile"
import InfoMenu from "../components/InfoMenu"
import Footer from "../components/Footer"
import { useWindowSize } from "../hooks"
import { graphql, useStaticQuery } from "gatsby"
import GraphAndSidebar from "../components/GraphAndSidebar"

export default function Home() {
  useEffect(() => {
    const html = document.querySelector("html")
    html.style.height = "100vh"
    html.style.position = "absolute"
    html.style.top = 0
    html.style.bottom = 0
    html.style.right = 0
    html.style.left = 0
  }, [])

  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024
  const IS_MOBILE_XS = width <= 450
  const [isOpen, setIsOpen] = useState(false)
  const [infobarIsOpen, setInfobarIsOpen] = useState(false)

  const changeInfobar = () => {
    setInfobarIsOpen(!infobarIsOpen)
  }

  const data = useStaticQuery(graphql`
    {
      artists: allAirtable(
        filter: { table: { eq: "Artist" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Artwork
            Influence
            Collaborated_On
            Bio
            Birthplace
            Email
            Website
            Interview
            Affiliations
            Tip
          }
          recordId
        }
      }
      artwork: allAirtable(
        filter: { table: { eq: "Artwork" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Primary_Artist__REQUIRED_
            Collaborators
            Locations
            Description
            Video
            Medium
            Theme
          }
          recordId
        }
      }
      locations: allAirtable(
        filter: { table: { eq: "Location" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Address
            Artwork
            Description
            Video
          }
          recordId
        }
      }
      themes: allAirtable(
        filter: { table: { eq: "Theme" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Artwork
            Description
          }
          recordId
        }
      }
      mediums: allAirtable(
        filter: { table: { eq: "Medium" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Artwork
            Description
          }
          recordId
        }
      }
      influences: allAirtable(
        filter: { table: { eq: "Influence" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Artist
            Description
          }
          recordId
        }
      }
    }
  `)

  return (
    <>
      <MobileNav isOpen={isOpen} />
      <LayoutMain nodes={data}>
        <div className="h-full overflow-hidden flex flex-col">
          <Header
            className={`${IS_MOBILE ? "h-8" : "h-10"} flex-auto relative`}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isMobile={IS_MOBILE}
          />
          <Navigation data={data} isMobile={IS_MOBILE} />
          <div className="flex-auto">
            <main className="h-full relative">
              <div
                className={`absolute top-0 ${
                  IS_MOBILE ? "bottom-10" : "bottom-8"
                }`}
              >
                <GraphAndSidebar data={data} />
                {IS_MOBILE && <SidebarMobile data={data} />}
              </div>
              {!IS_MOBILE && <Footer />}
            </main>
          </div>
          <div
            className={`absolute ${
              infobarIsOpen ? "top-12" : "top-full"
            } bottom-0 w-full`}
          >
            {IS_MOBILE && <InfoMenu changeInfobar={changeInfobar} />}
          </div>
        </div>
      </LayoutMain>
    </>
  )
}
