import React from "react"
import LayoutMain from "../components/LayoutMain"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import NodeGraph from "../components/NodeGraph/NodeGraph"
import LayoutSidebar from "../components/LayoutSidebar"
import InfoMenu from "../components/InfoMenu"

export default function Home() {
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
