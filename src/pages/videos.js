import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Video from "../components/Video"
import { useWindowSize } from "../hooks"

const Videos = () => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  const [isOpen, setIsOpen] = useState(false)
  const data = useStaticQuery(graphql`
    {
      artists: allAirtable(filter: { table: { eq: "Artist" } }) {
        nodes {
          table
          data {
            Name
            Email
            Website
            Interview
          }
          recordId
        }
      }
      artwork: allAirtable(filter: { table: { eq: "Artwork" } }) {
        nodes {
          table
          data {
            Name
            Primary_Artist__REQUIRED_
            Collaborators
            Video
          }
          recordId
        }
      }
      locations: allAirtable(filter: { table: { eq: "Location" } }) {
        nodes {
          table
          data {
            Name
            Video
          }
          recordId
        }
      }
    }
  `)

  const interviewVideos = data?.artists?.nodes
    .filter(el => el.data.Interview)
    .map(el => (
      <div className="mx-auto md:mx-0 w-screen md:w-1/3 mb-8 px-4 h-96">
        <Video
          key={el.recordId}
          videoSrcURL={el.data.Interview}
          videoTitle={el?.data?.Name || "Artist Interview"}
        />
      </div>
    ))

  const artworkVideos = data?.artwork?.nodes
    .filter(el => el.data.Video)
    .map(el => (
      <div className="mx-auto md:mx-0 w-screen md:w-1/3 mb-8 md:px-4 h-96">
        <Video
          key={el.recordId}
          videoSrcURL={el.data.Video}
          videoTitle={el?.data?.Name || "Artwork Video"}
        />
      </div>
    ))

    const locationVideos = data?.locations?.nodes
    .filter(el => el.data.Video)
    .map(el => (
      <div className="mx-auto md:mx-0 w-screen md:w-1/3 md:mb-8 md:px-4 h-96">
        <Video
          key={el.recordId}
          videoSrcURL={el.data.Video}
          videoTitle={el?.data?.Name || "Location Video"}
        />
      </div>
    ))
  return (
    <>
      <MobileNav isOpen={isOpen} />
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="container mx-auto">
        <h1 className="ml-4 mt-4 mb-2 text-5xl">Interviews</h1>
        <div className="flex flex-col md:flex-row flex-wrap">
          {interviewVideos}
        </div>
        <h1 className="ml-4 mt-4 mb-2 text-5xl">Artwork Videos</h1>
        <div className="flex flex-col md:flex-row flex-wrap">
          {artworkVideos}
        </div>
        <h1 className="ml-4 mt-4 mb-2 text-5xl">Locations</h1>
        <div className="flex flex-col md:flex-row flex-wrap">
          {locationVideos}
        </div>
      </div>
    </>
  )
}

export default Videos
