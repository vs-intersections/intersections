import React from "react"

const Influence = ({ data, influence }) => {
  const dataObjCopy = Object.assign({}, data)

  let influenceCopy = []
  if (influence) {
    influence.map((item, i) => {
      dataObjCopy.influences.nodes.forEach(node => {
        if (node.recordId === item) {
          influenceCopy.push(node.data.Name)
        }
      })
    })
  }

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold mb-3.5">Influence</h3>
      {influenceCopy.length === 0 ? (
        <p className="text-lg">
          It doesn't look like this artist has any influences
          <span className="block">How mysterious...</span>
        </p>
      ) : (
        influenceCopy.map(item => <p className="text-lg">{item}</p>)
      )}
      {/* <p className="text-lg">Paco de Lucia</p>
      <p className="text-lg">Good food</p> */}
    </div>
  )
}

export default Influence
