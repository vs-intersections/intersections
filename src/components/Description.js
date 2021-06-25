import React, { useContext } from "react"
import Video from "../components/Video"
import { getMetadataByFilterId } from "../utils"
import { useFilterContext } from "./context/FilterContext"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { DataContext } from "./context/DataContext"
import { LightboxContext } from "./context/LightboxContext"
import { useWindowSize } from "../hooks"

const SidebarDescription = () => {
  const [data] = useContext(DataContext)
  const [lightboxIsOpen, setLightboxIsOpen] = useContext(LightboxContext)
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

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
          }
          recordId
        }
      }

      affiliation: allAirtable(filter: { table: { eq: "Affiliation" } }) {
        nodes {
          data {
            Name
          }
          recordId
        }
      }

      medium: allAirtable(filter: { table: { eq: "Medium" } }) {
        nodes {
          data {
            Name
          }
          recordId
        }
      }

      locations: allAirtable(filter: { table: { eq: "Location" } }) {
        nodes {
          data {
            Name
            Address
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
      Address: address,
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

  // There are cases when a particular affiliation needs to be specially formatted
  // The following 2 functions format the paragraphs
  const renderedDescriptionNormal = processedDescription.map((item, i) => {
    return (
      <>
        <p key={item} className="text-lg">
          {item}
        </p>
        {i <= processedDescription.length - 1 && <br />}
      </>
    )
  })
  // Formats the paragraphs when the selected filter is a Theme of 'Emotion'
  const renderedDescriptionThemeEmotion = processedDescription.map(
    (item, i) => {
      // if (i) {
      //   const regex = item.match(/.*?:/i)
      //   // console.log(regex)
      //   console.log(item.split(/.*?:/i))
      // }

      return (
        <>
          <p key={item} className="text-lg">
            {item}
          </p>
          {i <= processedDescription.length - 1 && <br />}
        </>
      )
    }
  )
  // Formats the paragraph for specific affiliations
  const renderedDescriptionSpecial = processedDescription.map((item, i) => {
    const normalParagraph = (
      <p key={item} className="text-lg">
        {item}
      </p>
    )

    const modifiedParagraph = (
      <p
        key={item}
        className={`text-lg block text-center ${
          IS_MOBILE && i === 0 ? "mt-8" : ""
        }`}
      >
        <span className="font-bold">{item}</span>
      </p>
    )
    // determines if the first paragraph should be bolded and end with an <hr />
    // This REQUIRES that the Airtable field be formatted like this:
    // TITLE
    // double return
    // CONTENT
    // double return
    // CONTENT (this is usually a list of artists)
    // double return... (and repeat)
    return (
      <>
        {i % 3 === 0 && i !== 0 && <hr className="mb-6 w-4/5 mx-auto" />}
        {i % 3 === 0 ? modifiedParagraph : normalParagraph}
        {i <= processedDescription.length - 1 && <br />}
      </>
    )
  })
  // list of specially formatted affiliations (MUST MATCH IN AIRTABLE)
  const speciallyFormattedAffiliations = [
    "Artist Collectives",
    "Artist Residencies",
    "Food and Agriculture",
    "Galleries",
    "Literary Groups",
    "Museums, Art Centers, and Festivals",
    "Organizations centered on Indigenous peoples",
    "Organizations focused on social and/or environmental justice",
    "Performance Groups and Spaces",
    "Schools and Educational Organizations",
  ]

  let renderedDescription = []
  // sets renderedDescription to a normal or specially-formatted set of paragraphs
  for (let item of speciallyFormattedAffiliations) {
    if (name === item) {
      renderedDescription = renderedDescriptionSpecial
      break
    } else {
      renderedDescription = renderedDescriptionNormal
    }
  }

  const renderedAddress = (
    <div className="mt-2 text-lg">
      <span className="font-bold">Address:</span>{" "}
      <a
        className="transition-all underline-blue"
        href={`https://maps.google.com/?q=${address}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {address}
      </a>
    </div>
  )

  const handleArtworkClick = () => {
    selectedFilter?.filterType === "artwork" && setLightboxIsOpen(true)
  }

  return (
    <div className="mb-16">
      <h3 className="pb-1 text-2xl font-bold text-center">
        {table}: {name}
      </h3>
      <hr className="border-gray-400 border-t-2" />
      <div className={`w-3/4 mt-3 mx-auto ${video ? "h-96" : "h-auto"}`}>
        {descriptionImage && (
          <GatsbyImage
            className={
              selectedFilter?.filterType === "artwork" && "cursor-pointer"
            }
            image={descriptionImage}
            onClick={handleArtworkClick}
          />
        )}
        {video && <Video videoSrcURL={videoLink} videoTitle="Artwork Video" />}
      </div>
      {selectedFilter?.filterType === "location" && renderedAddress}
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
