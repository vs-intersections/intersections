import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const useInfluences = () => {
  const data = useStaticQuery(graphql`
    query InfluenceQuery {
      influences: allAirtable(filter: { table: { eq: "Influence" } }) {
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
  const influences = data?.influences?.nodes
  return {
    influences,
  }
}
