'use client'

import Link from 'next/link'
import { useState } from 'react'
import LogoTipo from './LogoTipo'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <LogoTipo />
        </Link>

        {/* Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-dark text-2xl"
        >
          ☰
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-8 items-center font-medium text-gray">
          <Link href="#servicos" className="hover:text-dark transition">
            Serviços
          </Link>
          <Link href="#galeria" className="hover:text-dark transition">
            Galeria
          </Link>
          <Link href="#contato" className="hover:text-dark transition">
            Contato
          </Link>
          <a href="https://wa.me/553195136154" className="btn-primary text-sm py-2 px-4">
            Agendar
          </a>
        </div>

        {/* Menu Mobile Expandido */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-t border-beige md:hidden">
            <div className="flex flex-col gap-4 p-4 font-medium text-gray">
              <Link href="#servicos" onClick={() => setIsOpen(false)}>
                Serviços
              </Link>
              <Link href="#galeria" onClick={() => setIsOpen(false)}>
                Galeria
              </Link>
              <Link href="#contato" onClick={() => setIsOpen(false)}>
                Contato
              </Link>
              <a href="https://wa.me/553195136154" className="btn-primary text-center">
                Agendar
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
