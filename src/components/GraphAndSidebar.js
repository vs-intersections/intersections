import React, { useState } from "react"
import { useWindowSize } from "../hooks"
import { useNodeContext } from "./context/NodeContext"
import NodeGraph from "./NodeGraph/NodeGraph"

const GraphAndSidebar = ({ data }) => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024
  const { selectedNode } = useNodeContext()
  const [sidebarOpened, setSidebarOpened] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened)
  }

  return (
    <div className="w-full flex relative">
      <div
        className={`h-full transition-all duration-500 ${
          sidebarOpened ? "w-60vw" : "w-100vw"
        }`}
      >
        <NodeGraph data={data} />
      </div>
      {!IS_MOBILE && (
        <div className="relative flex-1">
          <div className={`h-full w-45vw absolute left-n3vw`}>
            <div
              className="absolute top-10 left-0 w-3vw h-48 bg-orange rounded-tl-lg rounded-bl-lg"
              onClick={toggleSidebar}
            >
              <span className="transform -rotate-90 origin-center translate-y-24 block">
                ARTWORK
              </span>
            </div>
            <div className="absolute left-3vw w-40vw h-full bg-gray-500">
              {JSON.stringify(selectedNode)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GraphAndSidebar
