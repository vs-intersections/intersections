import React from "react"
import { FilterContextProvider } from "./context/FilterContext"
import { NodeContextProvider } from "./context/NodeContext"
import { SidebarContextProvider } from "./context/SidebarContext"
const LayoutMain = ({ children, nodes }) => {
  return (
    <div className="h-screen">
      <NodeContextProvider nodes={nodes}>
        <SidebarContextProvider>
          <FilterContextProvider>{children}</FilterContextProvider>
        </SidebarContextProvider>
      </NodeContextProvider>
    </div>
  )
}

export default LayoutMain
