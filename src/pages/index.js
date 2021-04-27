import React from "react"
import LayoutMain from "../components/LayoutMain"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import NodeGraph from "../components/NodeGraph/NodeGraph"
import SidebarMobile from "../components/SidebarMobile"
import InfoMenu from "../components/InfoMenu"
import SidebarDesktop from "../components/SidebarDesktop"
import { useWindowSize } from "../hooks"

export default function Home() {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024
  return (
    <LayoutMain>
      <div className="h-screen grid grid-rows-layout lg:grid-rows-layoutLg overflow-x-hidden">
        <Header />

        <Navigation />

        <div className="flex flex-col h-full">
          <main className="h-full grid grid-rows-mainContent lg:grid-rows-mainContentLg">
            <NodeGraph />
            {IS_MOBILE ? <SidebarMobile /> : <SidebarDesktop />}
            {IS_MOBILE && <InfoMenu />}
            {/* NEED TO RENDER OUT THE FOOTER INSTEAD OF INFOBAR @ MIN-WIDTH:1024PX */}
          </main>
        </div>
      </div>
    </LayoutMain>
  )
}
