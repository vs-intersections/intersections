import React, { useState } from "react"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useWindowSize } from "../hooks"

const About = () => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <div>
      {IS_MOBILE && (
        <MobileNav isOpen={isOpen} handleNavClick={handleNavClick} />
      )}
      <div className="h-full overflow-x-hidden flex flex-col">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} isMobile={IS_MOBILE} />
        <div className="w-full pt-10 lg:pt-16 pb-8 lg:pb-12">
          <div
            className={`flex flex-col justify-center item-center w-2/3 mx-auto mb-16 pt-8`}
          >
            <span className="bold text-orange text-3xl md:text-4xl my-4">
              INTERSECTIONS
            </span>
            <p className="mb-4">
              Intersections is a citywide group art exhibition that takes place
              in public space across the City of Santa Fe, New Mexico and on
              this interactive website. Rather than pick a single theme or other
              unifying commonality to structure the exhibition, the
              Intersections website allows us to highlight multiple points of
              connection--the intersections--among a wide range of artworks and
              among a diverse group of artists who call Santa Fe home. You can
              sort the works of art by theme, medium, or location and the
              artists by professional and personal affiliation, in effect,
              creating hundreds of mini group exhibitions. Or, you can spend
              time learning about one artist and exploring their work in depth.
            </p>
            <p className="mb-4">
              This website also contains new videos that bring together artists
              working in different art forms like dance, poetry, visual art, and
              music to reflect on a series of shared themes. You can see the
              first one, Intersections: Displacement, on the video page and we
              will be releasing three additional videos over the course of the
              summer.
            </p>
            <p className="mb-4">
              We’ve installed banners with a selection of artworks on them in
              parks and other public spaces across Santa Fe. We invite you to
              visit these physical installations, listed in the locations
              section of the website, to look for points of connection among the
              works of art on display and between the art and its surroundings.
              Please use <span className="font-bold">#Intersections2021</span>{" "}
              on social media to share the intersections you come up with!
            </p>
            <p className="mb-4">
              We have found that the commonalities shared by different works of
              art and artists are mutually illuminating. We hope that you love
              the art you see here, that you find new artists to follow and
              support, and that each intersection prompts unexpected insights
              and further exploration. Please consider a tip for the artists if
              you have been inspired by the artwork. 100% of this money goes
              directly to the artists you select:{" "}
              <span className="block font-bold">
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:bg-gray-200 transition-all"
                  href="https://secure.givelively.org/donate/vital-spaces-inc/intersections"
                >
                  secure.givelively.org/donate/vital-spaces-inc/intersections
                </a>
              </span>
            </p>
            <p className="font-bold">
              PS: It appears that you are viewing this website on your phone, we
              encourage you to also view it on a computer to see a visual
              rendering of the intersections.{" "}
            </p>
          </div>

          <div className="flex flex-col justify-center item-center w-2/3 mx-auto mb-16">
            <span className="bold text-orange text-2xl my-4">
              PARTICIPATING ARTISTS:
            </span>
            <div className={`${!IS_MOBILE ? "grid grid-cols-3 pl-4" : ""}`}>
              <div className="mb-2">Alberto Zalma</div>
              <div className="mb-2">Alejandra Avila</div>
              <div className="mb-2">Amelia Bauer</div>
              <div className="mb-2">Andrea Vargas</div>
              <div className="mb-2">Anjamora Ishi Sato</div>
              <div className="mb-2">Ariana Salazar</div>
              <div className="mb-2">Arista Slater-Sandoval</div>
              <div className="mb-2">Artemisio Romero y Carver</div>
              <div className="mb-2">Brandon Adriano Ortiz</div>
              <div className="mb-2">Camilla Trujillo</div>
              <div className="mb-2">Carolyn Mae Lassiter</div>
              <div className="mb-2">Diego Medina</div>
              <div className="mb-2">Ditch the Box Studios</div>
              <div className="mb-2">Enrique Figueredo</div>
              <div className="mb-2">Gino Antonio</div>
              <div className="mb-2">Ian Kuali’i</div>
              <div className="mb-2">Ileana Alarcon</div>
              <div className="mb-2">Johnny Ortiz</div>
              <div className="mb-2">Josh Tafoya</div>
              <div className="mb-2">Juan Pablo A.</div>
              <div className="mb-2">Lara Manzanares</div>
              <div className="mb-2">Layli Long Soldier</div>
              <div className="mb-2">Linda Lomahaftewa</div>
              <div className="mb-2">Macy Loy</div>
              <div className="mb-2">Morgan Barnard</div>
              <div className="mb-2">Nikesha Breeze</div>
              <div className="mb-2">Reena Saini Kallat</div>
              <div className="mb-2">Teresita V.</div>
              <div className="mb-2">Tigre Bailando</div>
              <div className="mb-2">Tintawi Kaigziabiher</div>
              <div className="mb-2">Tony Abeyta</div>
            </div>
          </div>

          <div className="flex flex-col justify-center item-center w-2/3 mx-auto mb-16">
            <span className="bold text-orange text-2xl my-4">
              PARTNER ORGANIZATIONS:
            </span>
            <p className="mb-4">
              Intersections was organized by Raashan Ahmad, Hannah Yohalem, and
              Rica Maestas from Vital Spaces, Ana Gallegos y Reinhardt from
              Warehouse 21, and Maida Branch from MAIDA.
            </p>
            <p className="mb-4">
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold hover:bg-gray-200 transition-all"
                href="https://www.vitalspaces.org/"
              >
                Vital Spaces
              </a>{" "}
              aims to create a vibrant, inclusive arts community, providing
              accessible spaces and opportunities to create, present, and
              experience quality art. We seek to enhance Santa Fe’s reputation
              as a contemporary art center by lifting up low-income and
              underrepresented artists and fostering connections across a
              diverse intersection of local artists, residents, and visitors.
            </p>
            <p className="mb-4">
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold hover:bg-gray-200 transition-all"
                href="https://www.warehouse21.org/"
              >
                Warehouse 21
              </a>{" "}
              supports a diverse, inclusive, positive, and welcoming community
              for young people by encouraging art, public service, mentoring,
              and meaningful exchange that challenges, empowers, and grows
              artistic development.
            </p>
            <p>
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold hover:bg-gray-200 transition-all"
                href="https://maidagoods.com/"
              >
                MAIDA
              </a>{" "}
              is a love story, a coming home story. An ever evolving project and
              expression of ancestry, homecoming, diaspora forced and chosen,
              memory learned and lost, reclamation and preservation. Inspired by
              her family and the land from which they came, Maida Branch founded
              MAIDA in 2017 - an online collective of Indigenous and
              Indo-hispano artists. MAIDA supports and promotes their work and
              preservation of their homelands with a 50/50 profit sharing model.
              Artists’ stories are told through the history of northern New
              Mexico via thoughtfully curated products/objects, photography, and
              short films about community and place.
            </p>
          </div>

          <div className="flex flex-col justify-center item-center w-2/3 mx-auto mb-16">
            <span className="bold text-orange text-2xl my-4 uppercase">
              SPECIAL THANKS TO:
            </span>
            <p className="mb-4">
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold hover:bg-gray-200 transition-all"
                href="https://www.albertpadilla.com/"
              >
                Albert Padilla
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold hover:bg-gray-200 transition-all"
                href="https://www.davidsanderson.dev/"
              >
                David Sanderson
              </a>{" "}
              for web design and web development.
            </p>
            <p className="mb-4">
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold hover:bg-gray-200 transition-all"
                href="http://www.dgrey.com/"
              >
                David Grey
              </a>{" "}
              for graphic design.
            </p>
            <p className="mb-4">
              Joanne Lefrak, Sage Sommer, and Brandee Caoba from{" "}
              <p className="mb-4">
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-bold hover:bg-gray-200 transition-all"
                  href="https://sitesantafe.org/"
                >
                  SITE Santa Fe{" "}
                </a>
                and Sandy Zane and Jordan Eddy from{" "}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-bold hover:bg-gray-200 transition-all"
                  href="https://www.formandconcept.center/"
                >
                  form & concept
                </a>{" "}
                for allowing us to film in your galleries.
              </p>
              <p className="mb-4">
                Richard Ross from{" "}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-bold hover:bg-gray-200 transition-all"
                  href="https://www.generalservices.state.nm.us/stateprinting/"
                >
                  New Mexico State Printing and Graphics
                </a>
                , Jason Poole from{" "}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-bold hover:bg-gray-200 transition-all"
                  href="http://www.imageratio.com/"
                >
                  Image Ratio
                </a>
                , Amelia Bauer, and John Vokoun for printing support.
              </p>
              <p className="mb-4">
                Carolina Franco from{" "}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-bold hover:bg-gray-200 transition-all"
                  href="https://sitesantafe.org/"
                >
                  SITE Santa Fe{" "}
                </a>
                for advertising advice.
              </p>
              <p className="mb-6">
                Doza and Anaid from{" "}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-bold hover:bg-gray-200 transition-all"
                  href="https://www.ditchtheboxstudios.com/"
                >
                  Ditch the Box Studios
                </a>{" "}
                for filming and editing the Intersections videos.
              </p>
              <p className="mb-4">
                Intersections is sponsored by The City of Santa Fe Arts and
                Culture Department, Cultural Investment Funding Program, Digital
                Collaborative Impact Award.{" "}
              </p>
              <p>
                Additional funding provided by the Santa Fe Community
                Foundation.
              </p>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default About
