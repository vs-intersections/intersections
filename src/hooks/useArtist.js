import Airtable from "airtable"
import { getMinifiedRecords } from "../lib"

const base = new Airtable({
  apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
}).base(process.env.GATSBY_AIRTABLE_BASE_ID)
const table = base("Artist")

export const useArtist = async (
  params = { sort: [{ field: "Name", direction: "asc" }] }
) => {
  const allArtists = await table.select(params).all()
  const artists = await getMinifiedRecords(allArtists)
  return artists
}
