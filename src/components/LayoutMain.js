import React from "react"
import { FilterContextProvider } from "./context/FilterContext"
import { NodeContextProvider } from "./context/NodeContext"
import { SidebarContextProvider } from "./context/SidebarContext"
import { DataProvider } from "../components/context/DataContext"
import { LightboxContextProvider } from "./context/LightboxContext"

const LayoutMain = ({ children, nodes }) => {
  return (
    <div className="h-screen relative">
      <LightboxContextProvider>
        <DataProvider>
          <NodeContextProvider nodes={nodes}>
            <SidebarContextProvider>
              <FilterContextProvider>{children}</FilterContextProvider>
            </SidebarContextProvider>
          </NodeContextProvider>
        </DataProvider>
      </LightboxContextProvider>
    </div>
  )
}

export default LayoutMain
