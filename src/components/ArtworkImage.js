import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

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
        }
      }
    }
  `)

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

  return result?.data?.Image ? (
    <GatsbyImage image={artworkImage} />
  ) : (
    <div className="w-full h-full bg-gray-500 text-lg flex justify-center items-center">
      NO IMAGE
    </div>
  )
}

export default ArtworkImage
