import React, { createContext, useContext, useState } from "react"
const NodeContext = createContext(null)

export const NodeContextProvider = ({ children, nodes } ) => {

    const [selectedNode, setSelectedNode] = useState(null)

  return (
    <NodeContext.Provider
      value={{
        nodes, selectedNode, setSelectedNode
      }}
    >
      {children}
    </NodeContext.Provider>
  )
}

export const useNodeContext = () => {
  const { nodes, selectedNode, setSelectedNode } = useContext(NodeContext)

  return {
    nodes, selectedNode, setSelectedNode
  }
}
