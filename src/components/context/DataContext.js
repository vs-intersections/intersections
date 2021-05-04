// a failed attempt at creating context for data gathered form the GraphQL query

import React, { createContext, useContext, useState } from "react"
export const DataContext = createContext(null)

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState({})
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  const { data, setData } = useContext(DataContext)

  return {
    data,
    setData,
  }
}
