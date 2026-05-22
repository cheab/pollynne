'use client'

import React from 'react'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'

export default function LocationMap() {
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
                      Jequitinhonha, MG<br />
                      Centro, Atendimento personalizado com hora marcada.
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
                      Terça a Sábado: 09h às 19h<br />
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
                      (31) 99513-6154<br />
                      contato@pollynne.com.br
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://maps.google.com/?q=Jequitinhonha,+MG"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15239.387926150244!2d-41.011664!3d-16.435889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x74b35ef58d53381%3A0xa63a23a31189c445!2sJequitinhonha%2C%20MG%2C%2039960-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
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
