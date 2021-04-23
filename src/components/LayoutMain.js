import React, { useState } from "react"
import FilterContext from "./context/FilterContext"

const LayoutMain = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState("")
  return (
    <div className="h-screen">
      <FilterContext.Provider value={[selectedFilter, setSelectedFilter]}>
        {children}
      </FilterContext.Provider>
    </div>
  )
}

export default LayoutMain
