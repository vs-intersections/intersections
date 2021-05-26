import React from "react"
import { FilterContextProvider } from "./context/FilterContext"
import { NodeContextProvider } from "./context/NodeContext"
import { SidebarContextProvider } from "./context/SidebarContext"
import { DataProvider } from "../components/context/DataContext"
const LayoutMain = ({ children, nodes }) => {
  return (
    <div className="h-screen">
      <DataProvider>
        <NodeContextProvider nodes={nodes}>
          <SidebarContextProvider>
            <FilterContextProvider>{children}</FilterContextProvider>
          </SidebarContextProvider>
        </NodeContextProvider>
      </DataProvider>
    </div>
  )
}

export default LayoutMain
