import React, { useContext } from "react"
import Video from "../components/Video"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useFilterContext } from "./context/FilterContext"

const ArtworkImage = ({ id, title, filterType, primaryArtist }) => {
  const sidebarData = useStaticQuery(graphql`
    {
      artists: allAirtable(filter: { table: { eq: "Artist" } }) {
        nodes {
          data {
            Name
            Bio_Image {
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
          }
          recordId
          table
        }
      }

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
            Primary_Artist__REQUIRED_
            Video
          }
          recordId
          table
        }
      }
    }
  `)

  const { selectedFilter, setSelectedFilter } = useFilterContext()

  const handleFilterLinkClick = item =>
    setSelectedFilter({
      filterName: item.recordId,
      filterType: item.table.toLowerCase() || "artwork",
    })

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

  const artistImage = sidebarData.artists.nodes.filter(
    artist => artist.recordId === primaryArtist
  )

  let artistImageData = {}
  if (artistImage) {
    artistImageData = {
      image:
        artistImage[0]?.data?.Bio_Image?.localFiles[0]?.childImageSharp
          ?.gatsbyImageData,
      recordId: artistImage[0]?.recordId,
      table: "artist",
    }
  }

  console.log(artistImage[0]?.data?.Bio_Image)

  const renderedData =
    result?.data?.Image && selectedFilter.filterType !== "affiliation" ? (
      <span
        className="cursor-pointer"
        onClick={() => handleFilterLinkClick(result)}
      >
        <GatsbyImage image={artworkImage} />
        {/* <GatsbyImage image={artistImageData.image} /> */}
      </span>
    ) : result?.data?.Video && selectedFilter.filterType !== "affiliation" ? (
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
    ) : artistImage.length !== 0 && artistImageData.image !== undefined ? (
      <span
        className="cursor-pointer"
        onClick={() => handleFilterLinkClick(artistImageData)}
      >
        <GatsbyImage image={artistImageData.image} />
      </span>
    ) : selectedFilter.filterType === "affiliation" ? (
      <div className="w-full h-full bg-gray-500 text-lg flex justify-center items-center">
        <div className="text-center">
          <div>NO ARTIST</div>
          <div>PHOTO</div>
        </div>
      </div>
    ) : (
      <div className="w-full h-full bg-gray-500 text-lg flex justify-center items-center">
        <div>
          <div>NO IMAGE</div>
          <div>AVAILABLE</div>
        </div>
      </div>
    )

  return <>{renderedData}</>
}

export default ArtworkImage
