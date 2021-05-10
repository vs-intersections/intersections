import React, { useState } from "react"
import MobileNav from "../components/MobileNav"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useWindowSize } from "../hooks"

const About = () => {
  const { width } = useWindowSize()
  const IS_MOBILE = width <= 1024

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <MobileNav isOpen={isOpen} />
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full border-t border-gray-300">
        <div className="flex flex-col justify-center item-center w-2/3 mx-auto mb-16 pt-8">
          <span className="bold text-orange text-4xl my-4">MISSION</span>
          <p>
            Vital Spaces is a Santa Fe-based 501(c)3 organization whose mission
            is to sustain and enhance Santa Fe's cultural vibrancy by creating
            affordable spaces for artists working in all media to create,
            present, connect, and teach. Our focus is on fostering a
            collaborative creative community and supporting people, ideas, and
            art forms that are underrepresented in Santa Fe's commercial art
            scene.
          </p>
        </div>

        <div className="flex flex-col justify-center item-center w-2/3 mx-auto mb-16">
          <span className="bold text-orange text-4xl my-4">
            IN SERVICE OF ARTISTS & THE ARTS
          </span>
          <p>
            We aim to support BIPOC artists, a population whose work has
            historically been underrepresented in contemporary art spaces in
            Santa Fe, as well as artists of all backgrounds whose socioeconomic
            status makes it difficult to maintain an artistic practice here.
            Beyond this focus, we wish to be inclusive of artists of all ages,
            religious beliefs, sexual orientations, and countries of origin. Our
            vision is a city in which people of all backgrounds have access to
            space for creating and showing their work. We operate on the
            principles of inclusion, equity, openness, and community engagement.
            As much as we want to promote diverse individuals, we also want to
            support diverse forms of artistic expression and thought including
            but not limited to performance, installation art, mixed media, the
            literary arts, and music. We hope to provide spaces where artists
            can push boundaries without having to focus on the marketability of
            their work. By providing affordable space, we aim to provide a venue
            for artists who might not otherwise know one another to come
            together in community and collaboration. We work to share this
            collaborative energy with the broader Santa Fe public through
            discussions, workshops, performance, and interactive art projects.
          </p>
        </div>

        <div className="flex flex-col justify-center item-center w-2/3 mx-auto mb-16">
          <span className="bold text-orange text-4xl my-4">WHY SANTA FE?</span>
          <p>
            We see the lack of affordable space in Santa Fe as the biggest
            threat the city faces in sustaining a vibrant cultural environment.
            We believe that affordable studio space and equitable access to
            exhibition opportunities are critical to the health and diversity of
            Santa Fe’s creative culture. Vital Spaces is a city vitality
            organization as much as it is an arts organization. The arts are
            Santa Fe’s second largest industry. We believe that a successful and
            relevant arts community that exists outside of commercial galleries
            is essential to the long term vibrancy of the city of Santa Fe. Our
            impact is multidimensional: when we give artists space, we breathe
            life into our communities with innovative artistic programming that
            inspires Santa Feans of all ages and backgrounds; we bring economic
            vitality to the creative community; and we raise Santa Fe’s profile
            on the national art stage. Santa Fe’s artistic history is rich and
            deep. It is also threatened by rising property costs and other
            socioeconomic factors that might suppress artistic growth by
            limiting access to resources and opportunities. We want to address
            that threat by providing affordable spaces to artists.
          </p>
        </div>

        <div className="flex flex-col justify-center item-center w-2/3 mx-auto mb-16">
          <span className="bold text-orange text-4xl my-4 uppercase">
            Our Model
          </span>
          <p>
            While the market prices in Santa Fe will almost certainly always be
            too high for many artists to afford, we take advantage of the
            downtime in buildings destined for other projects by rotating
            through unused spaces. We seek out temporary vacancies—buildings
            awaiting long-term tenants, building awaiting redevelopment, and
            buildings that are actively for lease but expect to remain on the
            market for some time—and turn them into studios and public venues
            for exhibitions, performance, events, and workshops.
          </p>
          <p>The benefits for property owners are clear:</p>
          <ul className="list-disc mx-auto my-4">
            <li>
              Vital Spaces manages the buildings while we use them, leaving them
              in better condition than we found them.
            </li>
            <li>
              We provide eyes on the ground throughout vacancies, protecting the
              space and alerting the owner to any leaks or other problems.
            </li>
            <li>
              By covering utilities and insurance while using the space, Vital
              Spaces saves owners money.
            </li>
            <li>
              We bring vitality and public programming to diverse neighborhoods
              across Santa Fe.
            </li>
            <li>
              We bring positive attention to the spaces we occupy and to their
              owners.
            </li>
            <li>
              We have a track-reco∏rd of successful building activations working
              with the following property owners in Santa Fe:
            </li>
          </ul>
          <ul className="list-decimal ml-24">
            <li>Adobe Star Properties</li>
            <li>The City of Santa Fe</li>
            <li>Colliers International</li>
            <li>Geisler Projects</li>
            <li>Thomas Properties</li>
          </ul>
          <p className="mt-5">
            Chashama, an organization from New York with a twenty-five-year
            track record of turning unused real estate into opportunities for
            artists and creatives, inspired our model. We are grateful to
            Chashama and its director, Anita Durst, for their guidance and
            support.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
