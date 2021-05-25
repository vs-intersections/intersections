/** @jsx jsx */
import React, { useState, useEffect } from "react"
import { css, jsx } from "@emotion/react"
import LayoutMain from "../components/LayoutMain"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import SidebarMobile from "../components/SidebarMobile"
import Footer from "../components/Footer"
import { useWindowSize } from "../hooks"
import { graphql, useStaticQuery } from "gatsby"
import GraphAndSidebar from "../components/GraphAndSidebar"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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

    window.innerWidth <= 1024 && setIsMobile(true)
  }, [])

  console.log("rendering the index page")

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
      {isMobile && <MobileNav isOpen={isOpen} />}
      <LayoutMain nodes={data}>
        <div className="h-full overflow-hidden flex flex-col">
          <Header
            className={`${isMobile ? "h-8" : "h-10"} flex-auto relative`}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Navigation data={data} isMobile={isMobile} />
          <div className="flex-auto">
            <main className="h-full relative">
              <div
                className={`absolute top-0 ${
                  isMobile ? "bottom-0" : "bottom-8"
                }`}
              >
                <GraphAndSidebar data={data} />
                {isMobile && <SidebarMobile data={data} />}
              </div>
              {!isMobile && <Footer />}
            </main>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}
