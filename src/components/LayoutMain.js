import React from "react"
import { FilterContextProvider } from "./context/FilterContext"
import { NodeContextProvider } from "./context/NodeContext"
const LayoutMain = ({ children, nodes }) => {
  return (
    <div className="h-screen">
      <NodeContextProvider nodes={nodes}>
        <FilterContextProvider>{children}</FilterContextProvider>
      </NodeContextProvider>
    </div>
  )
}

export default LayoutMain
