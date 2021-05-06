import React from "react"

const Video = ({ videoSrcURL, videoTitle }) => {
  return (
    <iframe
      className="w-full h-full align-baseline"
      src={videoSrcURL}
      title={videoTitle}
      frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  )
}

export default Video
