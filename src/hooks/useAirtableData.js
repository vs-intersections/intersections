import React from "react"
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
            Affiliations
            Tip
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
      influences: allAirtable(
        filter: { table: { eq: "Influence" } }
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
