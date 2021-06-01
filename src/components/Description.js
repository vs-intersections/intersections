import React, { useContext } from "react"
import Video from "../components/Video"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { DataContext } from "./context/DataContext"

const SidebarDescription = () => {
  const [data] = useContext(DataContext)

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
                    layout: FULL_WIDTH
                    transformOptions: { fit: CONTAIN }
                    backgroundColor: "transparent"
                  )
                }
              }
            }
          }
          recordId
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
                    layout: FULL_WIDTH
                    transformOptions: { fit: CONTAIN }
                    backgroundColor: "transparent"
                  )
                }
              }
            }
            Video
          }
          recordId
        }
      }
      themes: allAirtable(filter: { table: { eq: "Theme" } }) {
        nodes {
          data {
            Name
            Image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1.4
                    layout: FULL_WIDTH
                    transformOptions: { fit: CONTAIN }
                    backgroundColor: "transparent"
                  )
                }
              }
            }
          }
          recordId
        }
      }

      affiliation: allAirtable(filter: { table: { eq: "Affiliation" } }) {
        nodes {
          data {
            Name
            Image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1.4
                    layout: FULL_WIDTH
                    transformOptions: { fit: CONTAIN }
                    backgroundColor: "transparent"
                  )
                }
              }
            }
          }
          recordId
        }
      }

      medium: allAirtable(filter: { table: { eq: "Medium" } }) {
        nodes {
          data {
            Name
            Image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1.4
                    layout: FULL_WIDTH
                    transformOptions: { fit: CONTAIN }
                    backgroundColor: "transparent"
                  )
                }
              }
            }
          }
          recordId
        }
      }
      locations: allAirtable(filter: { table: { eq: "Location" } }) {
        nodes {
          data {
            Name
            Image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1.4
                    layout: FULL_WIDTH
                    transformOptions: { fit: CONTAIN }
                    backgroundColor: "transparent"
                  )
                }
              }
            }
          }
          recordId
        }
      }
    }
  `)

  // makes a copy of the data object instead of a reference (fixes a lot of bugs)
  const dataObjCopy = Object.assign({}, data)

  const { selectedFilter } = useFilterContext()

  let result = {}

  selectedFilter?.filterType === "artist" &&
    (result = sidebarData.artists.nodes.find(
      id => id.recordId === selectedFilter?.filterName
    ))

  selectedFilter?.filterType === "location" &&
    (result = sidebarData.locations.nodes.find(
      id => id.recordId === selectedFilter?.filterName
    ))

  selectedFilter?.filterType === "theme" &&
    (result = sidebarData.themes.nodes.find(
      id => id.recordId === selectedFilter?.filterName
    ))

  selectedFilter?.filterType === "medium" &&
    (result = sidebarData.medium.nodes.find(
      id => id.recordId === selectedFilter?.filterName
    ))

  selectedFilter?.filterType === "affiliation" &&
    (result = sidebarData.affiliation.nodes.find(
      id => id.recordId === selectedFilter?.filterName
    ))

  selectedFilter?.filterType === "artwork" &&
    (result = sidebarData.artwork.nodes.find(
      id => id.recordId === selectedFilter?.filterName
    ))

  let descriptionImage = {}

  if (
    selectedFilter?.filterType !== "artist" &&
    result &&
    !result.data?.Video
  ) {
    descriptionImage =
      result.data?.Image?.localFiles[0].childImageSharp.gatsbyImageData
  } else if (result && result.data?.Bio_Image) {
    descriptionImage =
      result.data?.Bio_Image?.localFiles[0].childImageSharp.gatsbyImageData
  } else {
    descriptionImage = ""
  }

  let metadata

  if (selectedFilter?.filterType) {
    metadata = getMetadataByFilterId(dataObjCopy, selectedFilter?.filterName)
  }

  const {
    table,
    data: {
      Bio: bio,
      Description: description,
      Name: name,
      Interview: interview,
      Video: video,
    },
  } = metadata

  const desc = description || bio
  let videoLink
  if (video) {
    let tempLink = video.split("https://vimeo.com/")
    tempLink[1]
      ? (videoLink = "https://player.vimeo.com/video/" + tempLink[1])
      : (videoLink = video)
  }

  const descProcess = () => {
    if (desc) {
      const splitText = desc.split("\n\n")
      return splitText
    }
  }

  let processedDescription = []
  if (desc) processedDescription = descProcess()

  const renderedDescription = processedDescription.map((item, i) => {
    return (
      <>
        <p key={item} className="text-lg">
          {item}
        </p>
        {i <= processedDescription.length - 1 && <br />}
      </>
    )
  })

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold text-center">
        {table}: {name}
      </h3>
      <hr className="border-gray-400 border-t-2" />
      <div className={`w-3/4 mt-3 mx-auto ${video ? "h-96" : "h-auto"}`}>
        {descriptionImage && <GatsbyImage image={descriptionImage} />}
        {video && <Video videoSrcURL={videoLink} videoTitle="Artwork Video" />}
      </div>
      <div className="mt-2">
        {desc ? (
          renderedDescription
        ) : (
          <p className="text-lg mt-2">Description coming soon</p>
        )}
      </div>
      {selectedFilter.filterType === "artist" && interview && (
        <>
          <p className="text-lg mt-3 font-bold mb-2">Interview Video</p>
          <div className="w-full h-96 bg-gray-500">
            <Video videoSrcURL={interview} videoTitle="Artist Interview" />
          </div>
        </>
      )}
    </div>
  )
}

export default SidebarDescription
