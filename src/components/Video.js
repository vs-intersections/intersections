import React from "react"
import { useFilterContext } from "./context/FilterContext"

const Video = ({
  videoSrcURL,
  videoTitle,
  onlyShowThumb,
  videoFilterLinkData,
}) => {
  const { setSelectedFilter } = useFilterContext()

  const handleFilterLinkClick = item => {
    setSelectedFilter({
      filterName: item.recordId,
      filterType: "artwork",
    })
  }

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
        className="w-full h-full align-baseline"
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
        <span
          className="absolute w-full h-full z-50 cursor-pointer"
          onClick={() => handleFilterLinkClick(videoFilterLinkData)}
        ></span>
      </div>
    )
  }

  return <>{renderedVideo()}</>
}

export default Video
