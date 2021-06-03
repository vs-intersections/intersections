import { useStaticQuery, graphql } from "gatsby"

export const useAirtableData = () => {
  const airtableData = useStaticQuery(graphql`
    {
      artists: allAirtable(
        filter: { table: { eq: "Artist" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Artwork
            Influence
            Collaborated_On
            Bio
            Birthplace
            Email
            Website
            Interview
            Affiliation
            Influence
            Tip
            Other_Link
          }
          recordId
        }
      }

      artwork: allAirtable(
        filter: { table: { eq: "Artwork" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
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
            Collaborators
            Locations
            Description
            Video
            Medium
            Theme
          }
          recordId
        }
      }

      locations: allAirtable(
        filter: { table: { eq: "Location" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Address
            Artwork
            Description
            Video
          }
          recordId
        }
      }

      themes: allAirtable(
        filter: { table: { eq: "Theme" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Artwork
            Description
          }
          recordId
        }
      }

      mediums: allAirtable(
        filter: { table: { eq: "Medium" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Artwork
            Description
          }
          recordId
        }
      }

      affiliations: allAirtable(
        filter: { table: { eq: "Affiliation" } }
        sort: { fields: data___Name }
      ) {
        nodes {
          table
          data {
            Name
            Artist
            Description
          }
          recordId
        }
      }
    }
  `)

  return airtableData
}
