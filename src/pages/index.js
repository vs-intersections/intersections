/** @jsx jsx */
import React, { useState } from "react"
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
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024
  const IS_MOBILE_XS = width <= 450
  const [isOpen, setIsOpen] = useState(false)

  const data = useStaticQuery(graphql`
  {
    artists: allAirtable(filter: { table: { eq: "Artist" } } sort: { fields:data___Name}) {
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
        }
        recordId
      }
    }
    artwork: allAirtable(filter: { table: { eq: "Artwork" } } sort: { fields:data___Name}) {
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
    locations: allAirtable(filter: { table: { eq: "Location" } } sort: { fields:data___Name}) {
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
    themes: allAirtable(filter: { table: { eq: "Theme" } } sort: { fields:data___Name}) {
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
    mediums: allAirtable(filter: { table: { eq: "Medium" } } sort: { fields:data___Name}) {
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
    influences: allAirtable(filter: { table: { eq: "Influence" } } sort: { fields:data___Name}) {
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
        <div className="h-screen grid grid-rows-layout lg:grid-rows-layoutLg overflow-hidden">
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <Navigation
            data={data}
            isMobile={IS_MOBILE}
            IsMobileXS={IS_MOBILE_XS}
          />
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 right-0">
              <main className="h-full grid grid-rows-mainContent lg:grid-rows-mainContentLg">
                <GraphAndSidebar data={data} />
                {IS_MOBILE && <SidebarMobile data={data} />}
                {IS_MOBILE ? <InfoMenu /> : <Footer />}
              </main>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}
