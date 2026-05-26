import Header from '@/components/Header'
import HeroCarousel from '@/components/HeroCarousel'
import InstagramFeed from '@/components/InstagramFeed'
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

  let instagramPosts = []
  if (settings?.instagramIsValidated && settings?.instagramAccessToken && settings?.instagramBusinessAccountId) {
    try {
      const url = `https://graph.facebook.com/v19.0/${settings.instagramBusinessAccountId}/media?fields=id,media_type,media_url,permalink,caption,timestamp&limit=6&access_token=${settings.instagramAccessToken}`
      const res = await fetch(url, {
        next: { revalidate: 3600 } // cache for 1 hour
      })
      if (res.ok) {
        const json = await res.json()
        instagramPosts = json.data || []
      }
    } catch (err) {
      console.error('Error fetching Instagram posts:', err)
    }
  }

  return (
    <>
      <Header settings={settings} />
      <FloatingWhatsApp settings={settings} />
      <main>
        <HeroCarousel settings={settings} />
        {instagramPosts.length > 0 && (
          <InstagramFeed posts={instagramPosts} nickname={settings?.instagramNickname} />
        )}
        <Services services={services} combos={combos} />
        <CTABanner settings={settings} />
        <Gallery services={services} settings={settings} />
        <LocationMap address={address} settings={settings} />
      </main>
      <Footer address={address} settings={settings} />
    </>
  )
}
