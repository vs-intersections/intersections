import { DEFAULT_DISTANCE, CHILD_NODE_SIZE } from "./linkGenerator"

const addChildNode = (
  links,
  nodes,
  parentNode,
  childNode,
  distance = DEFAULT_DISTANCE,
  isParent = false,
  selectedFilter
) => {
  childNode.color = "#FF985F"
  childNode.isParent = isParent
  childNode.size = isParent ? CHILD_NODE_SIZE * 1.35 : CHILD_NODE_SIZE
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
