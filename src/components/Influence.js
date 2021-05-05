import React from "react"

const Influence = ({ data, influence }) => {
  const dataObjCopy = Object.assign({}, data)

  // influence.map((item, i) => {
  //   dataObjCopy.influences.nodes.forEach(node => {
  //     if (node.recordId === item) {
  //       influence[i] = node.data.Name
  //       return influence
  //     }
  //   })
  // })

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Influence</h3>
      {}
      <p className="text-lg">Paco de Lucia</p>
      <p className="text-lg">Good food</p>
    </div>
  )
}

export default Influence
