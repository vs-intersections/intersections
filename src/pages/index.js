import React from "react"
import LayoutMain from "../components/LayoutMain"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import NodeGraph from "../components/NodeGraph"
import LayoutSidebar from "../components/LayoutSidebar"
import InfoMenu from "../components/InfoMenu"

export default function Home() {
  console.log(process.env.AIRTABLE_API_KEY)
  return (
    <LayoutMain>
      <div className="h-screen grid grid-rows-layout lg:grid-rows-layoutLg">
        <Header />

        <Navigation />

        <div className="flex flex-col h-full">
          <main className="h-full grid grid-rows-mainContent lg:grid-rows-mainContentLg">
            <NodeGraph />
            <LayoutSidebar />
            <InfoMenu />
            {/* NEED TO RENDER OUT THE FOOTER INSTEAD OF INFOBAR @ MIN-WIDTH:1024PX */}
          </main>
        </div>
      </div>
    </LayoutMain>
  )
}
