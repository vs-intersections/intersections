import React from "react"
import VideoLink from "./VideoLink"

const Video = ({
  videoSrcURL,
  videoTitle,
  onlyShowThumb,
  videoFilterLinkData,
}) => {
  let videoLink
  if (videoSrcURL) {
    let tempLink = videoSrcURL.split("https://vimeo.com/")
    tempLink[1]
      ? (videoLink = "https://player.vimeo.com/video/" + tempLink[1])
      : (videoLink = videoSrcURL)
  }

  const renderedVideo = () => {
    return !onlyShowThumb ? (
      <iframe
        className="w-full h-full align-baseline bg-black"
        src={videoLink}
        title={videoTitle}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
      />
    ) : (
      <div className="relative w-full h-full">
        <iframe
          className="absolute w-full h-full align-baseline"
          src={videoLink}
          title={videoTitle}
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
        />
        <VideoLink videoFilterLinkData={videoFilterLinkData} />
      </div>
    )
  }

  return <>{renderedVideo()}</>
}

export default Video
