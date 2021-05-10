import React from "react"
import Video from "../components/Video"

const VideoLayout = () => {
  return (
    <div className="border-t border-gray-300 flex justify-center items-center">
      <div className="w-4/5 flex justify-evenly">
        <div className="w-48">
          <div className="text-center mb-2">Video 1</div>
          <Video
            videoSrcURL="https://www.youtube.com/embed/NpEaa2P7qZI"
            videoTitle="Intersections 1"
          />
        </div>
        <div className="w-48">
          <div className="text-center mb-2">Video 2</div>
          <Video
            videoSrcURL="https://www.youtube.com/embed/NpEaa2P7qZI"
            videoTitle="Intersections 1"
          />
        </div>
        <div className="w-48">
          <div className="text-center mb-2">Video 3</div>
          <Video
            videoSrcURL="https://www.youtube.com/embed/NpEaa2P7qZI"
            videoTitle="Intersections 1"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoLayout
