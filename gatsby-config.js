require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Intersections`,
  },
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_API_KEY, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Artist`,
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Artwork`,
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Location`,
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Theme`,
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Medium`,
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Influence`,
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
  ],
}
