import Header from '@/components/Header'
import HeroCarousel from '@/components/HeroCarousel'
import Services from '@/components/Services'
import CTABanner from '@/components/CTABanner'
import Gallery from '@/components/Gallery'
import InstagramFeed from '@/components/InstagramFeed'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <FloatingWhatsApp />
      <main>
        <HeroCarousel />
        <Services />
        <CTABanner />
        <Gallery />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  )
}
