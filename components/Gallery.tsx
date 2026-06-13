'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X, Clock, Coins, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryItem {
  id: number
  title: string
  color: string
  photos?: { id: string; url: string; title: string; }[]
}

function GalleryCard({
  item,
  onCardClick,
}: {
  item: GalleryItem
  onCardClick?: (item: GalleryItem, initialIndex: number) => void
}) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!item.photos) return
    setCurrentIdx((prev) => (prev + 1) % item.photos!.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!item.photos) return
    setCurrentIdx((prev) => (prev - 1 + item.photos!.length) % item.photos!.length)
  }

  const hasImages = item.photos && item.photos.length > 0
  const isCarousel = item.photos && item.photos.length > 1

  return (
    <div
      onClick={() => hasImages && onCardClick && onCardClick(item, currentIdx)}
      className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-64 md:h-72 border border-gray-300/30 bg-gradient-to-br ${item.color} ${hasImages ? 'cursor-pointer' : ''}`}
    >
      {hasImages ? (
        <div className="w-full h-full relative select-none">
          {/* Blurred background image for the card */}
          <Image
            src={item.photos![currentIdx].url}
            alt=""
            fill
            className="object-cover blur-sm opacity-25 scale-105 transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={item.id === 1}
          />
          {/* Crisp, uncropped main image */}
          <Image
            src={item.photos![currentIdx].url}
            alt={item.photos![currentIdx].title || `${item.title} Foto ${currentIdx + 1}`}
            fill
            className="object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={item.id === 1}
          />
          {/* Subtle gradient overlay to read the text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5 opacity-100 group-hover:opacity-90 transition-opacity z-20" />

          {/* Hover zoom icon */}
          <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full text-white transform scale-90 group-hover:scale-100 transition-all duration-300">
              <Maximize2 size={20} className="drop-shadow-sm" />
            </div>
          </div>

          {/* Navigation buttons */}
          {isCarousel && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-dark flex items-center justify-center transition-colors shadow-md z-30 opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-dark flex items-center justify-center transition-colors shadow-md z-30 opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={16} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                {item.photos!.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIdx(i)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-white w-3.5' : 'bg-white/50 w-1.5'
                      }`}
                    aria-label={`Ir para imagem ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-30">
            <h3 className="font-display font-semibold text-xl text-white drop-shadow-md opacity-30 group-hover:opacity-100 transition-opacity duration-300">
              {item.title}
            </h3>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-dark relative overflow-hidden p-6">
          <h3 className="font-display font-bold text-2xl text-center px-4 text-dark opacity-30 group-hover:opacity-100 group-hover:scale-105 transform transition-all duration-300">
            {item.title}
          </h3>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        </div>
      )}
    </div>
  )
}

interface GalleryModalProps {
  item: GalleryItem
  initialIndex: number
  onClose: () => void
  services: any[]
  settings?: any
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

function GalleryModal({ item, initialIndex, onClose, services, settings }: GalleryModalProps) {
  const [[currentIdx, direction], setCurrentIdxAndDirection] = useState([initialIndex, 0])

  const hasImages = item.photos && item.photos.length > 0
  const isCarousel = item.photos && item.photos.length > 1

  const handleNext = () => {
    if (!item.photos) return
    setCurrentIdxAndDirection(([prevIdx]) => {
      const nextIdx = (prevIdx + 1) % item.photos!.length
      return [nextIdx, 1]
    })
  }

  const handlePrev = () => {
    if (!item.photos) return
    setCurrentIdxAndDirection(([prevIdx]) => {
      const nextIdx = (prevIdx - 1 + item.photos!.length) % item.photos!.length
      return [nextIdx, -1]
    })
  }

  const handleThumbnailClick = (idx: number) => {
    setCurrentIdxAndDirection(([prevIdx]) => {
      const dir = idx > prevIdx ? 1 : -1
      return [idx, dir]
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' && isCarousel) {
        handleNext()
      } else if (e.key === 'ArrowLeft' && isCarousel) {
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isCarousel])

  const serviceDetails = services.find(
    (s) => s.name.toLowerCase() === item.title.toLowerCase()
  )

  const whatsappNumber = settings?.whatsapp || '553195136154'
  const message = encodeURIComponent(
    `Olá, Pollynne! Vi o trabalho de "${item.title}" na galeria do seu site e gostaria de agendar uma sessão.`
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6 overflow-y-auto"
      style={{ zIndex: 100 }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 30, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl md:h-[75vh] flex flex-col md:flex-row relative border border-beige/10 max-h-[90vh] my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-white/80 md:bg-beige-light/40 hover:bg-beige-light text-dark transition-all duration-300 hover:rotate-90 shadow-md md:shadow-none"
          aria-label="Fechar modal"
        >
          <X size={18} />
        </button>

        {/* Image Container Column */}
        <div className="relative w-full h-[40vh] md:h-full md:w-3/5 bg-neutral-950 overflow-hidden flex items-center justify-center select-none">
          {hasImages && (
            <>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIdx}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Blurred background image for a premium blurred overlay effect */}
                  <Image
                    src={item.photos![currentIdx].url}
                    alt=""
                    fill
                    className="object-cover blur-md opacity-25 scale-105 select-none pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                  {/* Crisp, uncropped main image */}
                  <Image
                    src={item.photos![currentIdx].url}
                    alt={item.photos![currentIdx].title || `${item.title} Foto ${currentIdx + 1}`}
                    fill
                    className="object-contain relative z-10"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {isCarousel && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrev()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm active:scale-95 hover:scale-105 shadow-md"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNext()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm active:scale-95 hover:scale-105 shadow-md"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Page Indicator Badge */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
                    {currentIdx + 1} de {item.photos!.length}
                  </div>

                  {/* Thumbnails Overlay */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1 p-0.5 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md max-w-[90%] overflow-x-auto scrollbar-none">
                    {item.photos!.map((img, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleThumbnailClick(i)
                        }}
                        className={`relative h-4 w-4 md:h-5 md:w-5 rounded-sm overflow-hidden border transition-all duration-300 flex-shrink-0 ${i === currentIdx
                            ? 'border-white scale-105 shadow-sm'
                            : 'border-transparent opacity-50 hover:opacity-100'
                          }`}
                      >
                        <Image
                          src={img.url}
                          alt={img.title || `Miniatura ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="20px"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Info Column */}
        <div className="w-full flex-grow md:h-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="flex-grow">
            <span className="inline-block text-[10px] md:text-xs uppercase tracking-widest text-beige font-semibold mb-2">
              Tratamento de Beleza
            </span>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-dark mb-4 leading-tight">
              {item.title}
            </h2>
            <div className="w-12 h-0.5 bg-beige mb-6" />
            <p className="text-gray text-sm md:text-base leading-relaxed mb-6 font-body">
              {serviceDetails?.description ||
                'Tratamento personalizado desenvolvido com técnicas exclusivas para realçar a sua beleza natural.'}
            </p>
          </div>

          <div className="mt-auto">
            {/* Price & Duration Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-beige-light/20 border border-beige-light/50 rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-[10px] md:text-xs text-gray font-medium uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <Coins size={13} className="text-beige" /> Valor
                </span>
                <span className="text-base md:text-lg font-display font-bold text-dark">
                  {serviceDetails?.price || 'Sob Consulta'}
                </span>
              </div>
              <div className="bg-beige-light/20 border border-beige-light/50 rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-[10px] md:text-xs text-gray font-medium uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <Clock size={13} className="text-beige" /> Durabilidade
                </span>
                <span className="text-base md:text-lg font-display font-semibold text-dark">
                  {serviceDetails?.duration || 'Sob Consulta'}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-dark text-white hover:bg-gray transition-all duration-300 font-medium text-center flex items-center justify-center gap-2 group shadow-md hover:shadow-lg active:scale-[0.98] text-sm md:text-base"
            >
              <Phone
                size={16}
                className="transition-transform group-hover:scale-110"
              />
              <span>Agendar este Serviço</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery({ services, settings }: { services: any[]; settings?: any }) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleOpenModal = (item: GalleryItem, initialIndex: number) => {
    setSelectedItem(item)
    setSelectedImageIndex(initialIndex)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
  }

  const cardGradients = [
    'from-gray-200 to-gray-100',
    'from-beige to-beige-light',
    'from-gray-300 to-gray-200',
    'from-gray-100 to-gray-50',
    'from-beige-light to-gray-100',
    'from-gray-200 to-beige-light'
  ]

  const galleryList: GalleryItem[] = services.map((service, i) => ({
    id: i + 1,
    title: service.name,
    color: cardGradients[i % cardGradients.length],
    photos: service.photos
  }))

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
          {galleryList.map((item) => (
            <GalleryCard key={item.id} item={item} onCardClick={handleOpenModal} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray text-lg mb-6">
            Gostou de algum resultado? Agende sua sessão agora!
          </p>
          <a
            href={`https://wa.me/${settings?.whatsapp || '553195136154'}`}
            className="inline-flex items-center justify-center gap-1.5 btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone size={16} />
            <span>Agendar Consulta Gratuita</span>
          </a>
        </div>
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedItem && (
          <GalleryModal
            item={selectedItem}
            initialIndex={selectedImageIndex}
            onClose={handleCloseModal}
            services={services}
            settings={settings}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
