import React from "react"

const SidebarDescription = ({ table, locationName, description }) => {
  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold">
        {table}: {locationName}
      </h3>
      <p className="text-lg">{description}</p>
    </div>
  )
}

export default SidebarDescription
