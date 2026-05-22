import LogoTipo from './LogoTipo'

export default function Footer() {
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-beige text-sm transition">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-beige text-sm transition">
                Facebook
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
              <p>Jequitinhonha, MG</p>
              <p>(31) 99513-6154</p>
              <p>contato@pollynne.com.br</p>
              <a href="https://wa.me/553195136154" className="inline-block btn-primary text-sm py-2 px-4 mt-6">
                Whatsapp
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© {currentYear} Pollynne Leite Beauty. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Desenvolvido com ❤️ para sua beleza</p>
        </div>
      </div>
    </footer>
  )
}
