import React from "react"
import { Link } from "gatsby"

const notFound = () => {
  return (
    <div>
      <h1>Well this isn't good....</h1>
      <h3>You've reached a place that shouldn't exist</h3>
      <h3>
        You should go back{" "}
        <Link to="/">
          <span className="uppercase underline">home</span>
        </Link>
      </h3>
    </div>
  )
}

export default notFound
