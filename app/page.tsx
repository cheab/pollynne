import Header from '@/components/Header'
import Hero from '@/components/Hero'
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
        <Hero />
        <Services />
        <CTABanner />
        <Gallery />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  )
}
