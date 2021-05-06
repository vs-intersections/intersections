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
  const [isOpen, setIsOpen] = useState(false)

  const data = useStaticQuery(graphql`
    {
      artists: allAirtable(filter: { table: { eq: "Artist" } }) {
        nodes {
          table
          data {
            Name
            Artwork
            Influence
            Collaborated_On
            Bio
            Hometown
            Email
            Website
            Interview
            Favorites
          }
          recordId
        }
      }
      artwork: allAirtable(filter: { table: { eq: "Artwork" } }) {
        nodes {
          table
          data {
            Image {
              id
            }
            Name
            Primary_Artist__REQUIRED_
            Collaborators
            Locations
            Description
            Image_or_Audio {
              id
            }
            Video
            Medium
            Theme
          }
          recordId
        }
      }
      locations: allAirtable(filter: { table: { eq: "Location" } }) {
        nodes {
          table
          data {
            Image {
              id
            }
            Name
            Address
            Artwork
            Description
            Video
          }
          recordId
        }
      }
      themes: allAirtable(filter: { table: { eq: "Theme" } }) {
        nodes {
          table
          data {
            Name
            Artwork
            Description
            Image {
              id
            }
          }
          recordId
        }
      }
      mediums: allAirtable(filter: { table: { eq: "Medium" } }) {
        nodes {
          table
          data {
            Name
            Artwork
            Description
            Image {
              id
            }
          }
          recordId
        }
      }
      influences: allAirtable(filter: { table: { eq: "Influence" } }) {
        nodes {
          table
          data {
            Name
            Artist
            Description
            Image {
              id
            }
          }
          recordId
        }
      }
    }
  `)

  console.log(data)
  return (
    <>
      <MobileNav isOpen={isOpen} />
      <LayoutMain nodes={data}>
        <div className="h-screen grid grid-rows-layout lg:grid-rows-layoutLg overflow-x-hidden">
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <Navigation data={data} isMobile={IS_MOBILE}/>
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
