import { Github } from "@medusajs/icons"
import LightButton from "../../../layout/components/ui/LightButton"
import PrimaryButton from "../../../layout/components/ui/PrimaryButton"

import { Button, Heading } from "@medusajs/ui"
import { CirclePlay } from "lucide-react"

const Hero = () => {
  return (
    <section className="pt-6 lg:pt-20"> {/* pt-6 on small, pt-12 on large screens */}
      <div className="text-left content-container">
        <h1 className="mb-6 text-5xl font-bold leading-tight">
          Staviate alebo Obkladáte? Zrubko  <br />má drevo na mieru
        </h1>
        <p className="mb-10 text-xl text-gray-600">
          Vyberiete, vypočítate, objednáte – doručíme až k vám domov.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <LightButton href="/vyber" icon={<CirclePlay size={18} />}>Začať s výberom</LightButton>
          <PrimaryButton href="/showroom">Navštíviť showroom</PrimaryButton>


        </div>
      </div>
    </section>
  )
}

export default Hero
