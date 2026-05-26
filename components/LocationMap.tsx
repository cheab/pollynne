'use client'

import React from 'react'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'

interface Address {
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

interface Settings {
  whatsapp: string
  phone: string
  email: string
  hours: string
  days: string
}

export default function LocationMap({ address, settings }: { address: Address; settings?: Settings }) {
  const mapsSearchQuery = encodeURIComponent(
    `${address.rua}, ${address.numero}, ${address.bairro}, ${address.cidade} - ${address.estado}, ${address.cep}`
  )
  const mapsUrl = `https://maps.google.com/?q=${mapsSearchQuery}`
  const iframeUrl = `https://maps.google.com/maps?q=${mapsSearchQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`

  return (
    <section id="localizacao" className="py-16 md:py-24 px-4 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
            Nossa Localização
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Venha nos visitar e vivenciar uma experiência única de beleza e bem-estar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-beige-light p-8 rounded-2xl border border-beige shadow-sm">
            <div>
              <h3 className="font-display text-xl font-bold text-dark mb-6">
                Pollynne Leite Beauty
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center text-dark shadow-sm shrink-0">
                    <MapPin size={20} className="text-dark/80" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-dark mb-1">Endereço</h4>
                    <p className="text-gray text-sm leading-relaxed">
                      {address.rua}, {address.numero}<br />
                      {address.bairro} - {address.cidade}, {address.estado}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center text-dark shadow-sm shrink-0">
                    <Clock size={20} className="text-dark/80" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-dark mb-1">Horário</h4>
                    <p className="text-gray text-sm leading-relaxed">
                      {settings?.days || 'Terça a Sábado'}: {settings?.hours || '09h às 19h'}<br />
                      Atendimento exclusivo sob agendamento.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center text-dark shadow-sm shrink-0">
                    <Phone size={20} className="text-dark/80" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-dark mb-1">Contato</h4>
                    <p className="text-gray text-sm leading-relaxed">
                      {settings?.phone || '(31) 99513-6154'}<br />
                      {settings?.email || 'contato@pollynne.com.br'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary flex items-center justify-center gap-2 py-3 transition-transform hover:scale-[1.02]"
              >
                <Navigation size={16} />
                Como Chegar
              </a>
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-8 h-96 lg:h-auto min-h-[350px] relative rounded-2xl overflow-hidden shadow-md border border-beige">
            <iframe
              src={iframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
