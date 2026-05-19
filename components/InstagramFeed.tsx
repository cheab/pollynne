'use client'

import { useEffect, useState } from 'react'

interface InstagramPost {
  id: string
  media_type: string
  media_url: string
  caption?: string
  timestamp: string
  permalink: string
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN
        const igBusinessAccountId = process.env.NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID

        if (!accessToken || !igBusinessAccountId) {
          setError('Instagram não configurado. Configure as variáveis de ambiente.')
          setLoading(false)
          return
        }

        const response = await fetch(
          `https://graph.instagram.com/${igBusinessAccountId}/media?fields=id,media_type,media_url,caption,timestamp,permalink&access_token=${accessToken}`
        )

        if (!response.ok) {
          throw new Error('Erro ao buscar posts do Instagram')
        }

        const data = await response.json()
        setPosts(data.data.slice(0, 6)) // Últimas 6 fotos
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar Instagram')
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
              Acompanhe no Instagram
            </h2>
            <p className="text-gray text-lg">Carregando...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
              Acompanhe no Instagram
            </h2>
            <p className="text-gray text-lg mb-8">{error}</p>
            <a
              href="https://instagram.com/pollynne_beauty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-primary"
            >
              Visite nosso Instagram
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
            Acompanhe no Instagram
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Veja os últimos trabalhos e fique por dentro das novidades de beleza.
          </p>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aspect-square bg-beige-light"
            >
              {post.media_url && (
                <img
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.5-9c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://instagram.com/pollynne_beauty"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block btn-primary"
          >
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
