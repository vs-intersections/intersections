import React, { createContext, useContext, useState } from "react"
const SidebarContext = createContext(null)

export const SidebarContextProvider = ({ children }) => {
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false)
  const [selectedSidebar, setSelectedSidebar] = useState(null)
  const [sideBarMobileIsOpen, setSideBarMobileIsOpen] = useState(false)
  const [infoMenuIsOpen, setInfoMenuIsOpen] = useState(false)

  return (
    <SidebarContext.Provider
      value={{
        sidebarIsOpened,
        setSidebarIsOpened,
        selectedSidebar,
        setSelectedSidebar,
        sideBarMobileIsOpen,
        setSideBarMobileIsOpen,
        infoMenuIsOpen,
        setInfoMenuIsOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  const {
    sidebarIsOpened,
    setSidebarIsOpened,
    selectedSidebar,
    setSelectedSidebar,
    sideBarMobileIsOpen,
    setSideBarMobileIsOpen,
    infoMenuIsOpen,
    setInfoMenuIsOpen,
  } = useContext(SidebarContext)

  return {
    sidebarIsOpened,
    setSidebarIsOpened,
    selectedSidebar,
    setSelectedSidebar,
    sideBarMobileIsOpen,
    setSideBarMobileIsOpen,
    infoMenuIsOpen,
    setInfoMenuIsOpen,
  }
}
