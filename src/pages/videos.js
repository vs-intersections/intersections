import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Video from "../components/Video"
import { useWindowSize } from "../hooks"
import { translateIdToName } from "../utils"

const Videos = () => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024
  const [isOpen, setIsOpen] = useState(false)

  // REMOVED "Interview" from Artist query
  const data = useStaticQuery(graphql`
    {
      artists: allAirtable(filter: { table: { eq: "Artist" } }) {
        nodes {
          table
          data {
            Name
            Email
            Website
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
            Theme
          }
          recordId
        }
      }

      themes: allAirtable(filter: { table: { eq: "Theme" } }) {
        nodes {
          data {
            Name
          }
          recordId
        }
      }
    }
  `)

  let intersectionsVideos = data?.artwork?.nodes
    .filter(
      el =>
        el.data.Video &&
        el.data.Primary_Artist__REQUIRED_[0] === "rec6GjpkqIFLImQsm" // Ditch The Box Studios
    )
    .map(el => {
      return (
        <div className="mx-auto md:mx-0 w-full md:w-1/3 mb-16 px-4 h-64 sm:h-96 md:h-48 lg:h-80 pb-4">
          <Video
            key={el.recordId}
            videoSrcURL={el.data.Video}
            videoTitle={el?.data?.Name || "Artwork Video"}
          />
          <h3 className="text-center text-2xl mt-3">{el?.data?.Name}</h3>
        </div>
      )
    })

  // have "Intersections" come before "Intersections: Bonus Footage"
  intersectionsVideos.reverse()

  const artworkVideos = data?.artwork?.nodes
    .filter(
      el =>
        el.data.Video &&
        el.data.Primary_Artist__REQUIRED_[0] !== "rec6GjpkqIFLImQsm" // Ditch The Box Studios
    )
    .map(el => (
      <div className="mx-auto md:mx-0 w-full md:w-1/3 mb-16 px-4 h-64 sm:h-96 md:h-48 lg:h-80 pb-4">
        <Video
          key={el.recordId}
          videoSrcURL={el.data.Video}
          videoTitle={el?.data?.Name || "Artwork Video"}
        />
        <h3 className="text-center text-2xl mt-3">
          {translateIdToName(
            data,
            el.data.Primary_Artist__REQUIRED_[0],
            "artist"
          )}
        </h3>
      </div>
    ))

  const interviewVideos = data?.artists?.nodes
    .filter(el => el.data.Interview)
    .map(el => (
      <div className="mx-auto md:mx-0 w-full md:w-1/3 mb-16 px-4 h-64 sm:h-96 md:h-48 lg:h-80 pb-4">
        <Video
          key={el.recordId}
          videoSrcURL={el.data.Interview}
          videoTitle={el?.data?.Name || "Artist Interview"}
        />
        <h3 className="text-center text-2xl mt-3">{el?.data?.Name}</h3>
      </div>
    ))

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {IS_MOBILE && (
        <MobileNav isOpen={isOpen} handleNavClick={handleNavClick} />
      )}
      <div className="h-full overflow-x-hidden flex flex-col">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="w-full pt-16 overflow-x-hidden">
          <div className="container mx-auto">
            <div className="mb-12">
              <h1 className="ml-4 mt-4 mb-6 text-5xl">Intersections</h1>
              <div className="flex flex-col md:flex-row flex-wrap">
                {intersectionsVideos}
              </div>
            </div>
            <div className="mb-12">
              <h1 className="ml-4 mt-4 mb-6 text-5xl">Artwork Videos</h1>
              <div className="flex flex-col md:flex-row flex-wrap">
                {artworkVideos}
              </div>
            </div>
            <div className="mb-12">
              <h1 className="ml-4 mt-4 mb-6 text-5xl">Interviews</h1>
              <div className="flex flex-col md:flex-row flex-wrap">
                {interviewVideos.length > 0 ? (
                  interviewVideos
                ) : (
                  <div className="ml-4 mt-4 mb-6 text-2xl">COMING SOON</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Videos
