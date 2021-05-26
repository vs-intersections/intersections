import React, { createContext, useState } from "react"
import { useAirtableData } from "../../hooks/"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const airtableData = useAirtableData()

  const [data, setData] = useState(airtableData)

  console.log(data)

  return (
    <DataContext.Provider value={[data, setData]}>
      {children}
    </DataContext.Provider>
  )
}
