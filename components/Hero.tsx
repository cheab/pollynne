export default function Hero() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 hero-gradient">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Texto */}
        <div className="order-2 md:order-1">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
            Sua Melhor <span className="text-beige-500">Versão</span>
          </h1>
          <p className="text-lg text-gray mb-8 leading-relaxed max-w-lg">
            Somos especialistas em tratar sua beleza de forma natural, buscando a melhor versão do seu olhar. Conheça todos os nossos serviços e tenha sua melhor experiência.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#servicos" className="btn-primary text-center">
              Explorar Serviços
            </a>
            <a href="https://wa.me/553195136154" className="btn-secondary text-center">
              Entrar em Contato
            </a>
          </div>
        </div>

        {/* Imagem */}
        <div className="order-1 md:order-2">
          <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-beige to-beige-light overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-dark/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
