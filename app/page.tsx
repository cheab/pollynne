import Header from '@/components/Header'
import HeroCarousel from '@/components/HeroCarousel'
import Services from '@/components/Services'
import CTABanner from '@/components/CTABanner'
import Gallery from '@/components/Gallery'
import LocationMap from '@/components/LocationMap'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import Footer from '@/components/Footer'
import { getServices, getCombos, getAddress, getSettings } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [services, combos, address, settings] = await Promise.all([
    getServices(),
    getCombos(),
    getAddress(),
    getSettings()
  ])

  return (
    <>
      <Header settings={settings} />
      <FloatingWhatsApp settings={settings} />
      <main>
        <HeroCarousel settings={settings} />
        <Services services={services} combos={combos} />
        <CTABanner settings={settings} />
        <Gallery services={services} settings={settings} />
        <LocationMap address={address} settings={settings} />
      </main>
      <Footer address={address} settings={settings} />
    </>
  )
}
