'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryItem {
  id: number
  title: string
  color: string
  images?: string[]
}

const gallery: GalleryItem[] = [
  {
    id: 1,
    title: 'Design Premium',
    color: 'from-gray-200 to-gray-100',
    images: [
      '/catalog/Design-premium.jpg',
      '/catalog/Design-premium-.jpg',
      '/catalog/Design-premium-_1_.jpg'
    ]
  },
  {
    id: 2,
    title: 'Nano Art',
    color: 'from-beige to-beige-light',
  },
  {
    id: 3,
    title: 'Micro Labial',
    color: 'from-gray-300 to-gray-200',
    images: [
      '/catalog/Micro-labial.jpg',
      '/catalog/Micro-labial-_1_.jpg',
      '/catalog/Brow-Lamination-e-micro-labial.jpg'
    ]
  },
  {
    id: 4,
    title: 'Brow Lamination',
    color: 'from-gray-100 to-gray-50',
    images: [
      '/catalog/Brow-Lamination.jpg',
      '/catalog/Brow-Lamination-_1_.jpg',
      '/catalog/Brow-Lamination-e-micro-labial.jpg'
    ]
  },
  {
    id: 5,
    title: 'Lash Lifting',
    color: 'from-beige-light to-gray-100',
  },
  {
    id: 6,
    title: 'Hidra Color',
    color: 'from-gray-200 to-beige-light',
  },
]

function GalleryCard({ item }: { item: GalleryItem }) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!item.images) return
    setCurrentIdx((prev) => (prev + 1) % item.images!.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!item.images) return
    setCurrentIdx((prev) => (prev - 1 + item.images!.length) % item.images!.length)
  }

  const hasImages = item.images && item.images.length > 0
  const isCarousel = item.images && item.images.length > 1

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-64 md:h-72 border border-gray-300/30 bg-gradient-to-br ${item.color}`}
    >
      {hasImages ? (
        <div className="w-full h-full relative select-none">
          <Image
            src={item.images![currentIdx]}
            alt={`${item.title} Image ${currentIdx + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={item.id === 1}
          />
          {/* Subtle gradient overlay to read the text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10" />

          {/* Navigation buttons */}
          {isCarousel && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-dark flex items-center justify-center transition-colors shadow-md z-20 opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-dark flex items-center justify-center transition-colors shadow-md z-20 opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={16} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {item.images!.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIdx(i)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIdx ? 'bg-white w-3.5' : 'bg-white/50 w-1.5'
                    }`}
                    aria-label={`Ir para imagem ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-20">
            <h3 className="font-display font-semibold text-xl text-white drop-shadow-md">
              {item.title}
            </h3>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-dark relative overflow-hidden p-6">
          <h3 className="font-display font-bold text-2xl text-center px-4 text-dark group-hover:scale-105 transform transition-transform duration-300">
            {item.title}
          </h3>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        </div>
      )}
    </div>
  )
}

export default function Gallery() {
  return (
    <section id="galeria" className="py-16 md:py-24 px-4 bg-beige-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
            Galeria de Trabalhos
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Confira os resultados incríveis dos nossos tratamentos.
          </p>
        </div>

        {/* Grid de Galeria */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray text-lg mb-6">
            Gostou de algum resultado? Agende sua sessão agora!
          </p>
          <a
            href="https://wa.me/553195136154"
            className="inline-block btn-primary"
          >
            Agendar Consulta Gratuita
          </a>
        </div>
      </div>
    </section>
  )
}
