import React from "react"

const Favorites = ({ favorites }) => {
  const renderedData = favorites?.map(item => {
    return <p className="text-lg">{item}</p>
  })
  return (
    <div>
      <div className="mb-16">
        <h3 className="pb-1 text-2xl font-bold mb-3.5">Favorites</h3>
        {renderedData}
      </div>
    </div>
  )
}

export default Favorites
