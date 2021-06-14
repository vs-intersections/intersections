import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
  query SiteMetadataQuery {
    site {
      siteMetadata {
        description
        title
      }
    }
  }
  `)
  const siteMetadata = data?.site?.siteMetadata
  return {
    siteMetadata
  }
}
