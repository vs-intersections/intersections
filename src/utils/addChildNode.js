import { DEFAULT_DISTANCE, CHILD_NODE_SIZE } from "./linkGenerator"

const addChildNode = (
  links,
  nodes,
  parentNode,
  childNode,
  distance = DEFAULT_DISTANCE,
  isSelectedParent = false,
  selectedFilter
) => {
  childNode.color = "#FF985F"
  childNode.isSelectedParent = isSelectedParent
  childNode.size = CHILD_NODE_SIZE
  nodes.push(childNode)

  links.push({
    source: parentNode,
    target: childNode,
    distance: distance,
  })

  // logic for selecting specific artist - creates node links from parent to child
  if (parentNode.id === selectedFilter.filterName) {
    links.push({
      source: parentNode,
      target: childNode,
      distance: distance,
      color: "#A3F78E",
      strokeWidth: 5,
    })
    // logic for selecting specific artwork - creates node links from parent to child
  } else if (childNode.id === selectedFilter.filterName) {
    links.push({
      source: parentNode,
      target: childNode,
      distance: distance,
      color: childNode.color,
      strokeWidth: 5,
    })
    // logic for selecting specific location - creates node links from parent to child
  } else if (childNode.isSelectedChild) {
    links.push({
      source: parentNode,
      target: childNode,
      distance: distance,
      color: parentNode.color,
      strokeWidth: 5,
    })
    // creates default node links from parent to child
  } else {
    links.push({
      source: parentNode,
      target: childNode,
      distance: distance,
    })
  }
}

export default addChildNode
