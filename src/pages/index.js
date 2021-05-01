import React from "react"
import LayoutMain from "../components/LayoutMain"
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
          }
          recordId
        }
      }
      artwork: allAirtable(filter: { table: { eq: "Artwork" } }) {
        nodes {
          table
          data {
            Name
            Primary_Artist__REQUIRED_
            Collaborators
            Locations
            Medium
            Theme
          }
          recordId
        }
      }
      locations: allAirtable(filter: { table: { eq: "Location" } }) {
        nodes {
          data {
            Name
            Artwork
          }
          recordId
        }
      }
      themes: allAirtable(filter: { table: { eq: "Theme" } }) {
        nodes {
          data {
            Name
            Artwork
          }
          recordId
        }
      }
      mediums: allAirtable(filter: { table: { eq: "Medium" } }) {
        nodes {
          data {
            Name
            Artwork
          }
          recordId
        }
      }
      influences: allAirtable(filter: { table: { eq: "Influence" } }) {
        nodes {
          data {
            Name
            Artist
          }
          recordId
        }
      }
    }
  `)
  return (
    <LayoutMain nodes={data}>
      <div className="h-screen grid grid-rows-layout lg:grid-rows-layoutLg overflow-x-hidden">
        <Header />
        <Navigation data={data} />
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <main className="h-full grid grid-rows-mainContent lg:grid-rows-mainContentLg">
              <GraphAndSidebar data={data} />

              {IS_MOBILE && <SidebarMobile />}
              {IS_MOBILE ? <InfoMenu /> : <Footer />}
            </main>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}
