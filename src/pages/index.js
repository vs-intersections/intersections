import React from "react"
import LayoutMain from "../components/LayoutMain"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import NodeGraph from "../components/NodeGraph/NodeGraph"
import SidebarMobile from "../components/SidebarMobile"
import InfoMenu from "../components/InfoMenu"
import SidebarDesktop from "../components/SidebarDesktop"
import { useWindowSize } from "../hooks"
import { graphql, useStaticQuery } from "gatsby"

export default function Home() {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  const data = useStaticQuery(graphql`
    {
      artists: allAirtable(filter: { table: { eq: "Artist" } }) {
        nodes {
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
    }
  `)
  return (
    <LayoutMain>
      <div className="h-screen grid grid-rows-layout lg:grid-rows-layoutLg overflow-x-hidden">
        <Header />
        <Navigation data={data} />
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-500">
            <main className="h-full grid grid-rows-mainContent lg:grid-rows-mainContentLg">
              <NodeGraph data={data} />
              {IS_MOBILE ? <SidebarMobile /> : <SidebarDesktop />}
              {IS_MOBILE && <InfoMenu />}
              {/* NEED TO RENDER OUT THE FOOTER INSTEAD OF INFOBAR @ MIN-WIDTH:1024PX */}
            </main>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}
