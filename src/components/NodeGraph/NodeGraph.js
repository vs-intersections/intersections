import React, { useEffect, useRef, useContext } from "react"
import FilterContext from "../context/FilterContext"
import { graphql, useStaticQuery } from "gatsby"
import { defaultLinkGenerator } from "../../utils"
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
  select,
  drag,
  layout,
  scaleLinear,
  zoom,
  selectAll,
} from "d3"

const NodeGraph = () => {
  const [selectedFilter] = useContext(FilterContext)
  const queryData = useStaticQuery(graphql`
    {
      artists: allAirtable(filter: { table: { eq: "Artist" } }) {
        nodes {
          data {
            Name
            Artwork
            Influence
          }
          recordId
        }
      }
      artwork: allAirtable(filter: { table: { eq: "Artwork" } }) {
        nodes {
          data {
            Name
            Primary_Artist__REQUIRED_
            Collaborators
            Locations
            Medium
            Theme
          }
          recordId
        }
      }
    }
  `)

  // ref to grab the SVG element
  const ref = useRef()
  const containerRef = useRef()

  // these values are arbitrary but allow a finer detail for SVG elements
  let width = 500
  let height = 500

  // after the page has loaded, grab Airtable data from defaultLinkGenerator,
  // then populate React state and begin the data viz
  useEffect(() => {
    const results = defaultLinkGenerator(queryData, selectedFilter)
    main(results)
  }, [selectedFilter])

  const main = data => {
    console.log(data)
    // grab nodes and links from the data generated from defaultLinkGenerator
    let nodes = data.nodes
    let links = data.links

    // svg specific variables
    // set the D3 container to a certain aspect ratio
    const svg = select(ref.current).attr("viewBox", `0 0 ${width} ${height}`)
    svg.selectAll("line").remove()
    svg.selectAll("circle").remove()
    svg.selectAll("text").remove()

    const centerX = width / 2
    const centerY = height / 2

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
      width = containerRef.current.clientWidth
      height = containerRef.current.clientHeight
      svg.attr("width", width).attr("height", height)
    }

    resize()
    select(window).on("resize", resize)

    // highlight nodes on mouse hover
    function highlight(e, datapoint) {
      let oldColor = datapoint.color
      let oldSize = datapoint.size
      let oldFill = datapoint.fill

      select(this)
        .transition()
        .duration(250)
        .attr("r", datapoint => (datapoint.size *= 1.2))
        .attr("fill", datapoint => (datapoint.color = "dodgerBlue"))

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

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div ref={containerRef} className="flex-grow-0 w-auto h-full">
        <svg ref={ref} className="w-auto h-full" version="1.1"></svg>
      </div>
    </div>
  )
}

export default NodeGraph
