import LogoTipo from './LogoTipo'
import { Phone } from 'lucide-react'

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

interface Address {
  cidade: string
  estado: string
}

interface Settings {
  whatsapp: string
  phone: string
  email: string
  instagramNickname?: string
}

export default function Footer({ address, settings }: { address: Address; settings: Settings }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contato" className="bg-dark text-white py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Sobre */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <LogoTipo light={true} className="mb-4" />
            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-sm">
              Especialistas em beleza natural, buscando sempre a melhor versão do seu olhar.
            </p>
            <div className="flex gap-6">
              <a
                href={`https://instagram.com/${settings?.instagramNickname || 'pollynne_beauty'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-beige text-sm transition flex items-center gap-2"
              >
                <InstagramIcon size={16} />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Serviços Rápidos */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-display font-bold text-lg mb-4">Serviços</h4>
            <ul className="space-y-2 text-gray-300 flex flex-col items-center md:items-start">
              <li><a href="#servicos" className="hover:text-beige transition">Design de Sobrancelha</a></li>
              <li><a href="#servicos" className="hover:text-beige transition">Microblading</a></li>
              <li><a href="#servicos" className="hover:text-beige transition">Lash Lifting</a></li>
              <li><a href="#servicos" className="hover:text-beige transition">Micropigmentação Labial</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-display font-bold text-lg mb-4">Contate-nos</h4>
            <div className="space-y-3 text-gray-400 text-sm flex flex-col items-center md:items-start">
              <p>{address?.cidade || 'Jequitinhonha'}, {address?.estado || 'MG'}</p>
              <p>
                <a
                  href={`tel:${(settings?.phone || '(31) 99513-6154').replace(/[^\d+]/g, '')}`}
                  className="hover:text-beige transition"
                >
                  {settings?.phone || '(31) 99513-6154'}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${settings?.email || 'contato@pollynne.com.br'}`}
                  className="hover:text-beige transition"
                >
                  {settings?.email || 'contato@pollynne.com.br'}
                </a>
              </p>
              <a
                href={`https://wa.me/${settings?.whatsapp || '553195136154'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-beige text-sm transition flex items-center gap-2 mt-2"
              >
                <Phone size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© {currentYear} Pollynne Leite Beauty. Todos os direitos reservados.</p>
          <p className="text-sm mt-2 flex items-center justify-center gap-1.5 flex-wrap">
            <span>Desenvolvido com ❤️ para sua beleza</span>
            <span className="text-gray-600">•</span>
            <a href="/admin" className="text-gray-400 hover:text-beige transition text-xs font-light">
              Área Administrativa
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
