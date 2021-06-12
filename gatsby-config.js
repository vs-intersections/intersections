require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Intersections: Vital Spaces, Maida, Warehouse 21`,
    description: `Sustaining & enhancing Santa Fe's cultural vibrancy by creating 
    affordable spaces for artists working in all media to create, present, connect, & teach`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_API_KEY, // may instead specify via env, see below
        concurrency: 8, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Artist`,
            mapping: { Bio_Image: "fileNode" },
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Artwork`,
            mapping: { Image: "fileNode", Audio: "fileNode" },
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Location`,
            mapping: { Image: "fileNode" },
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Theme`,
            mapping: { Image: "fileNode" },
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Medium`,
            mapping: { Image: "fileNode" },
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Affiliation`,
            mapping: { Image: "fileNode" },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`poppins`, `jaldi`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
  ],
  flags: {
    FAST_DEV: true,
  },
}
