import React from "react"
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
function MobileNav2({
  artwork,
  artists,
  locations,
  themes,
  mediums,
  influences,
  generateDropdown,
}) {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={6}
    >
      <Slider>
        <Slide index={0}>
          {" "}
          {generateDropdown("artist", artists, "lightGreen")}
        </Slide>
        <Slide index={1}>
          {" "}
          {generateDropdown("artwork", artwork, "orange")}
        </Slide>
        <Slide index={2}>
          {generateDropdown("location", locations, "blue")}
        </Slide>
        <Slide index={3}>{generateDropdown("theme", themes, "pink")}</Slide>
        <Slide index={4}>
          {generateDropdown("influence", influences, "yellow")}
        </Slide>
        <Slide>
        {generateDropdown("medium", mediums, "lightBlue")}

        </Slide>
      </Slider>
    </CarouselProvider>
  )
}

export default MobileNav2
