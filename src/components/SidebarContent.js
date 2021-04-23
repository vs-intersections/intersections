import React from "react"
import SidebarArtist from "./SidebarArtist"
import SidebarArtwork from "./SidebarArtwork"
import SidebarLocation from "./SidebarLocation"
import SidebarMedium from "./SidebarMedium"
import SidebarTheme from "./SidebarTheme"
import SidebarInfluence from "./SidebarInfluence"

const SidebarContent = () => {
  /*
  These comps will be called based on what the user has selected in the filter
  */

  return <SidebarArtist />
  // return <SidebarArtwork />
  // return <SidebarLocation />
  // return <SidebarMedium />
  // return <SidebarTheme />
  // return <SidebarInfluence />
}

export default SidebarContent
