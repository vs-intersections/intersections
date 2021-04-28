import React, { useEffect, useRef, useContext, useState } from "react"
import { useFilterContext } from "../context/FilterContext"
import { useNodeContext } from "../context/NodeContext"
import { linkGenerator } from "../../utils"
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
  select,
  drag,
  zoom,
} from "d3"

const NodeGraph = ({ data }) => {
  // this keeps track of the selected filter
  const { selectedFilter, setSelectedFilter } = useFilterContext()

  const { nodes, selectedNode, setSelectedNode } = useNodeContext()

  // refs to grab the SVG element and SVG element container
  const ref = useRef()
  const containerRef = useRef()

  // declare vars here to be used through out this component
  let IS_MOBILE = 0,
    width,
    height,
    aspectBase,
    aspectW,
    aspectH,
    aspectRatioWidth,
    aspectRatioHeight

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
    // determine if the current view is on mobile
    IS_MOBILE = width <= 1024
    // determine the aspect values through the Maths (see function)
    aspectW = getAspect(width, height)
    aspectH = getAspect(height, width)
    // set the default zoom of the SVG
    aspectBase = IS_MOBILE ? 550 : 500
    // set the aspect ratio (to be used in the viewbox)
    aspectRatioWidth = aspectBase * aspectW || 500
    aspectRatioHeight = aspectBase * aspectH || 500
  }

  useEffect(() => {
    // set values for viewbox, and SVG width and height
    setAspectRatio()
    // after the page has loaded, grab Airtable data from linkGenerator,
    console.log(selectedFilter)
    const results = linkGenerator(data, selectedFilter)
    // begin the data viz
    main(results)
    // re-run useEffect if a new filter has been chosen
  }, [selectedFilter])

  const main = data => {
    // grab nodes and links from the data generated from linkGenerator
    let nodes = data.nodes
    let links = data.links

    // svg specific variables
    // set the D3 container to a certain aspect ratio
    const svg = select(ref.current)
      .attr("viewBox", `0 0 ${aspectRatioWidth} ${aspectRatioHeight}`)
      .attr("width", width)
      .attr("height", height)
    svg.selectAll("line").remove()
    svg.selectAll("circle").remove()
    svg.selectAll("text").remove()

    let centerX = width / 2
    let centerY = height / 2

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
      centerY = aspectRatioHeight / 2
      simulation.force("center", forceCenter(centerX, centerY))
      // set new values for viewbox, and SVG width and height
      svg.attr("viewBox", `0 0 ${aspectRatioWidth} ${aspectRatioHeight}`)
      svg.attr("width", width).attr("height", height)
    }

    // run the resize function to center the SVG, then listen for more resizing
    resize()
    select(window).on("resize", resize)

    // highlight nodes on mouse hover
    function highlight(e, datapoint) {
      // keep track of the nodes previous attributes - will be reverted after the highlight action
      let oldColor = datapoint.color
      let oldSize = datapoint.size
      let oldFill = datapoint.fill
      // select the hovered node and transition its radius and fill over 250ms
      select(this)
        .transition()
        .duration(250)
        .attr("r", datapoint => (datapoint.size *= 1.2))
        .attr("fill", datapoint => (datapoint.color = "dodgerBlue"))
      // when the selected node is no longer hovered, revert its animated states (fill and radius)
      select(this).on("mouseout", function () {
        select(this)
          .transition()
          .duration(250)
          .attr("fill", datapoint =>
            datapoint.isParent
              ? (datapoint.fill = oldFill)
              : (datapoint.color = oldColor)
          )
          .attr("r", datapoint => (datapoint.size = oldSize))
      })
    }


    function nodeClick(e, datapoint) {
      setSelectedNode(datapoint)
      console.log(datapoint)
      setSelectedFilter({
        filterName: datapoint.id,
        filterType: datapoint.table
      })
    }
    // svg elements
    const lines = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", line => line.color || "#c7c7c7")
      .attr("stroke-width", line => line.strokeWidth || 1)

    const circles = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("fill", node => (node.isParent ? node.fill : node.color))
      .attr("stroke", node => (node.isParent ? node.color : "none"))
      .attr("stroke-width", node => (node.isParent ? 5 : "none"))
      .attr("r", node => node.size)
      .classed("parent", node => node.isParent)
      .on("mouseover", highlight)
      .call(dragInteraction(simulation))


      svg.selectAll('circle').on("click", nodeClick)

    const text = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", node => node.size * 0.4)
      .attr("alignment-baseline", "middle")
      .style("pointer-events", "none")
      .text(node => node.name)

    // simulation rendering function
    simulation.on("tick", () => {
      circles.attr("cx", node => node.x).attr("cy", node => node.y)
      text.attr("x", node => node.x).attr("y", node => node.y)
      lines
        .attr("x1", link => link.source.x)
        .attr("y1", link => link.source.y)
        .attr("x2", link => link.target.x)
        .attr("y2", link => link.target.y)
    })
  }

  // return (
  //   <div
  //     ref={containerRef}
  //     className="flex flex-col justify-center items-center"
  //   >
  //     <div className="flex-grow-0 w-full">
  //       <svg ref={ref} className="w-full" version="1.1"></svg>
  //     </div>
  //   </div>
  // )
  return (
    <div ref={containerRef} className="w-full">
      {JSON.stringify(selectedNode)}
      <svg ref={ref} className="w-full" version="1.1"></svg>
    </div>
  )
}

export default NodeGraph
