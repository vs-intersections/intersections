import React, { useEffect, useRef, useContext } from "react"
import { useFilterContext } from "../context/FilterContext"
import { useNodeContext } from "../context/NodeContext"
import { DataContext } from "../context/DataContext"
import { linkGenerator } from "../../utils"
import { useWindowSize } from "../../hooks"
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
  select,
  drag,
  zoom,
  selectAll,
} from "d3"

const NodeGraph = () => {
  const [data] = useContext(DataContext)
  // this keeps track of the selected filter
  const { selectedFilter, setSelectedFilter } = useFilterContext()
  const { setSelectedNode } = useNodeContext()
  const { width: windowWidth } = useWindowSize()
  let IS_MOBILE = windowWidth <= 1024

  // refs to grab the SVG element and SVG element container
  const ref = useRef()
  const containerRef = useRef()

  // declare vars here to be used through out this component
  const DEFAULT_LINK_COLOR = "#ddd"
  const MAX_TEXT_LENGTH = 25
  // the default zoom of the SVG (lower the number to zoom in)
  const ASPECT_BASE = 850
  let width, height, aspectW, aspectH, aspectRatioWidth, aspectRatioHeight

  // determine aspect ratio of value inputs
  // this only determines one of the values, depending on if you want the width or height aspect ratio
  // if width: (width, height) | if height: (height, width)
  const getAspect = (x, y) => {
    return Math.round((x / y) * 100) / 100
  }

  const setAspectRatio = () => {
    // grab svg container width and height
    width = containerRef.current.clientWidth
    height = containerRef.current.clientHeight
    // determine the aspect values through the Maths (see function)
    aspectW = getAspect(width, height)
    aspectH = getAspect(height, width)
    // set the aspect ratio (to be used in the viewbox)
    aspectRatioWidth = ASPECT_BASE * aspectW || 600
    aspectRatioHeight = ASPECT_BASE * aspectH || 600
  }

  const dataCopy = Object.assign({}, data)

  useEffect(() => {
    // set values for viewbox, and SVG width and height
    setAspectRatio()
    // after the page has loaded, grab Airtable data from linkGenerator
    const results = linkGenerator(dataCopy, selectedFilter)
    // begin the data viz
    main(results)
    // re-run useEffect if a new filter has been chosen
  }, [selectedFilter])

  const main = graphData => {
    // grab nodes and links from the data generated from linkGenerator
    let nodes = graphData.nodes
    let links = graphData.links

    // svg specific variables
    // set the D3 container to a certain aspect ratio
    const svgWrapper = select(ref.current)
      .attr("viewBox", `0 0 ${aspectRatioWidth} ${aspectRatioHeight}`)
      .attr("width", width)
      .attr("height", height)

    svgWrapper.selectAll("g").remove()

    const svg = svgWrapper.append("g")
    svg.attr("transform", "none")

    let centerX = width / 2
    let centerY = IS_MOBILE ? aspectRatioHeight / 2.4 : aspectRatioHeight / 1.75

    // simulation force settings
    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-500))
      .force(
        "link",
        forceLink(links).distance(link => link.distance)
      )
      .force("center", forceCenter(centerX, centerY))
      .force(
        "collide",
        forceCollide().radius(function (d) {
          return d.radius
        })
      )

    // drag functionality
    const dragInteraction = simulation => {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    }

    const resize = () => {
      setAspectRatio()

      // re-center SVG after window resizing
      centerX = aspectRatioWidth / 2
      centerY = IS_MOBILE ? aspectRatioHeight / 2.4 : aspectRatioHeight / 1.75
      simulation.force("center", forceCenter(centerX, centerY))
      // set new values for viewbox, and SVG width and height
      svgWrapper.attr("viewBox", `0 0 ${aspectRatioWidth} ${aspectRatioHeight}`)
      svgWrapper.attr("width", width).attr("height", height)
    }

    // run the resize function to center the SVG, then listen for more resizing
    resize()
    select(window).on("resize", resize)

    // ZOOM function - IT WORKS!!! Except it resets weird
    svgWrapper.call(
      zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([1, 8])
        .on("zoom", zoomed)
    )

    function zoomed({ transform }) {
      svg.attr("transform", transform)
    }

    // highlight nodes on mouse hover
    function highlight(e, datapoint) {
      // keep track of the nodes previous attributes - will be reverted after the highlight action
      let oldColor = datapoint.color
      let oldSize = datapoint.size
      // let oldFill = datapoint.fill
      // select the hovered node and transition its radius and fill over 250ms
      let themeColor = datapoint.table === "Artist" ? "#A3F78E" : "#FF985F"

      select(this)
        .transition()
        .duration(250)
        .attr("r", datapoint => (datapoint.size *= 1.8))
        .attr(
          "fill",
          datapoint => (datapoint.color = datapoint.linkColor || themeColor)
        )
      // when the selected node is no longer hovered, revert its animated states (fill and radius)
      select(this).on("mouseout", function () {
        select(this)
          .transition()
          .duration(150)
          .attr("fill", datapoint => (datapoint.color = oldColor))
          .attr("r", datapoint => (datapoint.size = oldSize))
      })
    }

    // fix the double render bug here
    function nodeClick(e, datapoint) {
      if (selectedFilter.filterName === datapoint.id) {
        return
      }
      setSelectedNode(datapoint)
      setSelectedFilter({
        filterName: datapoint.id,
        filterType: datapoint.table.toLowerCase(),
      })
    }

    const selectedLinks = links.filter(
      el =>
        el.target.isSelectedChild ||
        el.target.isSelectedParent ||
        el.target.linkColor
    )

    const grayLinks = links.filter(
      el =>
        !el.target.isSelectedChild ||
        !el.target.isSelectedParent ||
        !el.target.linkColor
    )

    const newLinks = [...grayLinks, ...selectedLinks]
    // svg elements
    const lines = svg
      .selectAll("line")
      // IMPORTANT: switch this back to links if this breaks anything!
      .data(newLinks)
      .enter()
      .append("line")
      .attr(
        "stroke",
        line => line.linkColor || line.color || DEFAULT_LINK_COLOR
      )
      .attr("stroke-width", line => line.strokeWidth || 1)

    // group the circle nodes to add sibling elements (tooltips and halo)
    const circleGroups = svg.selectAll("g").data(nodes).enter().append("g")
    // tooltips
    circleGroups.append("title").text(d => d.name)
    // halo circles styled based on 'isParent' node metadata
    // this may attribute to perf issues as duplicate node circles are being created
    const circlesHalo = circleGroups
      .append("circle")
      .attr("fill", node =>
        node.isSelectedParent ||
        node.isSelectedChild ||
        node.isSelectedChildMain
          ? node.fill
          : node.color
      )
      .attr("stroke", node =>
        node.isSelectedParent ||
        node.isSelectedChild ||
        node.isSelectedChildMain
          ? node.linkColor
          : node.color || "none"
      )
      .attr("stroke-width", node =>
        node.isSelectedParent || node.isSelectedChildMain
          ? 5
          : node.isSelectedChild
          ? 2
          : "none"
      )
      .attr("r", node =>
        node.isSelectedParent || node.isSelectedChildMain
          ? node.size * 1.35
          : node.isSelectedChild
          ? node.size * 1.25
          : node.size
      )
      .classed("parent-halo", node => node.isSelectedParent)

    const circles = circleGroups
      .append("circle")
      .attr("fill", node => node.color)
      .attr("stroke", "none")
      .attr("stroke-width", "none")
      .attr("r", node => node.size)
      .classed("parent", node => node.isSelectedParent) // to style in CSS (not yet used)
      .on("mouseover", highlight)
      .on("click", nodeClick)
      .call(dragInteraction(simulation))

    const text = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", node => node.size * 0.4)
      .attr("alignment-baseline", "middle")
      .style("pointer-events", "none")
      .text(node =>
        node.name.length > MAX_TEXT_LENGTH
          ? node.name.slice(0, MAX_TEXT_LENGTH) + "..."
          : node.name
      )

    // simulation rendering function
    simulation.on("tick", () => {
      circles.attr("cx", node => node.x).attr("cy", node => node.y)
      circlesHalo.attr("cx", node => node.x).attr("cy", node => node.y)
      text.attr("x", node => node.x).attr("y", node => node.y)
      lines
        .attr("x1", link => link.source.x)
        .attr("y1", link => link.source.y)
        .attr("x2", link => link.target.x)
        .attr("y2", link => link.target.y)
    })
  }

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <svg ref={ref} className="w-full h-full" version="1.1"></svg>
    </div>
  )
}

export default NodeGraph
