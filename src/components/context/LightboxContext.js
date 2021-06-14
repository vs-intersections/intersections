import React, { createContext, useState } from "react"

export const LightboxContext = createContext()

export const LightboxContextProvider = ({ children }) => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)

  return (
    <LightboxContext.Provider value={[lightboxIsOpen, setLightboxIsOpen]}>
      {children}
    </LightboxContext.Provider>
  )
}
