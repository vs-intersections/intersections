import React, { createContext, useContext, useState } from "react"
export const FilterContext = createContext(null)

export const FilterContextProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState({
    filterName: "",
    filterType: "artist",
  })
  return (
    <FilterContext.Provider
      value={{
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  const { selectedFilter, setSelectedFilter } = useContext(FilterContext)

  return {
    selectedFilter,
    setSelectedFilter,
  }
}
