import Airtable from "airtable"
import { getMinifiedRecords } from "../lib"

const base = new Airtable({
  apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
}).base(process.env.GATSBY_AIRTABLE_BASE_ID)
const table = base("Artwork")

export const useArtwork = async (
  params = { sort: [{ field: "Name", direction: "asc" }] }
) => {
  const allArtwork = await table.select(params).all()
  const artwork = await getMinifiedRecords(allArtwork)
  return artwork
}
