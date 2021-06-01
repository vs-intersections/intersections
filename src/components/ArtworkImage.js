import React, { useContext } from "react"
import Video from "../components/Video"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useFilterContext } from "./context/FilterContext"

const ArtworkImage = ({ id, title, filterType, primaryArtist }) => {
  const sidebarData = useStaticQuery(graphql`
    {
      artwork: allAirtable(filter: { table: { eq: "Artwork" } }) {
        nodes {
          data {
            Name
            Image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1.4
                    transformOptions: { fit: CONTAIN }
                    backgroundColor: "transparent"
                  )
                }
              }
            }
            Audio {
              raw {
                url
              }
            }
            Primary_Artist__REQUIRED_
            Video
          }
          recordId
          table
        }
      }
    }
  `)

  const { setSelectedFilter } = useFilterContext()

  const handleFilterLinkClick = item => {
    setSelectedFilter({
      filterName: item.recordId,
      filterType: "artwork",
    })
  }

  const generateResult = () => {
    if (filterType === "affiliation" && primaryArtist) {
      return sidebarData.artwork.nodes.find(
        item => item.data.Primary_Artist__REQUIRED_[0] === primaryArtist
      )
    } else if (!filterType) {
      return sidebarData.artwork.nodes.find(item => item.data.Name === title)
    }
  }

  let result = generateResult()
  let artworkImage = {}

  result &&
    (artworkImage =
      result.data?.Image?.localFiles[0]?.childImageSharp?.gatsbyImageData)

  const renderedData = () => {
    return result?.data?.Image ? (
      <span
        className="cursor-pointer"
        onClick={() => handleFilterLinkClick(result)}
      >
        <GatsbyImage image={artworkImage} />
      </span>
    ) : result?.data?.Video ? (
      <div className="w-full h-full bg-gray-500 text-lg flex justify-center items-center">
        <span
          className="cursor-pointer w-full h-full"
          onClick={() => handleFilterLinkClick(result)}
        >
          <Video
            videoSrcURL={result?.data?.Video}
            videoTitle={title}
            onlyShowThumb={true}
            videoFilterLinkData={result.recordId}
          />
        </span>
      </div>
    ) : (
      <div className="w-full h-full bg-gray-500 text-lg flex justify-center items-center">
        <div>
          <div>NO IMAGE</div>
          <div>AVAILABLE</div>
        </div>
      </div>
    )
  }

  return <>{renderedData()}</>
}

export default ArtworkImage
