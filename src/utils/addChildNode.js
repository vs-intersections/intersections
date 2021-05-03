import { DEFAULT_DISTANCE } from "./linkGenerator"

const addChildNode = (
  links,
  nodes,
  parentNode,
  childNode,
  distance = DEFAULT_DISTANCE,
  selectedFilter
) => {
  childNode.color = "#FF985F"
  childNode.fill = "white"
  childNode.linkColor = childNode.isSelectedChild
    ? parentNode.linkColor
    : childNode.linkColor
  nodes.push(childNode)

  // creates default gray lines that connect children to parent nodes
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
  } else if (childNode.isSelectedChild && parentNode.isSelectedParent) {
    links.push({
      source: parentNode,
      target: childNode,
      distance: distance,
      color: parentNode.color,
      linkColor: parentNode.linkColor,
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
