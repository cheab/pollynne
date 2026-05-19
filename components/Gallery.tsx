'use client'

import { useState } from 'react'

const gallery = [
  {
    id: 1,
    title: 'Design Premium',
    color: 'from-gray-200 to-gray-100',
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
  },
  {
    id: 4,
    title: 'Brow Lamination',
    color: 'from-gray-100 to-gray-50',
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

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
            <div
              key={item.id}
              onClick={() => setSelectedCategory(item.title)}
              className={`group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${item.color} h-56 md:h-64 border border-gray-300/30`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-dark relative overflow-hidden">
                <h3 className="font-display font-bold text-2xl text-center px-6 text-dark group-hover:scale-105 transform transition-transform duration-300">
                  {item.title}
                </h3>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>
            </div>
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
