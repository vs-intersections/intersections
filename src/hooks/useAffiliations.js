import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const useAffiliations = () => {
  const data = useStaticQuery(graphql`
    query AffiliationQuery {
      affiliations: allAirtable(filter: { table: { eq: "Affiliation" } }) {
        totalCount
        nodes {
          table
          recordId
          data {
            Name
            Description
            Artist
          }
        }
      }
    }
  `)
  const affiliations = data?.affiliations?.nodes
  return {
    affiliations,
  }
}
