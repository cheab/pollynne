interface Settings {
  whatsapp: string
}

export default function CTABanner({ settings }: { settings?: Settings }) {
  return (
    <section className="py-12 md:py-16 px-4 bg-dark text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Pronto para sua transformação?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Escolha um de nossos serviços e agende sua consulta gratuita. 
          Nossa especialista está pronta para atender você.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${settings?.whatsapp || '553195136154'}`}
            className="btn-primary"
          >
            Agendar Consulta
          </a>
          <a
            href="#servicos"
            className="btn-secondary"
          >
            Ver Serviços
          </a>
        </div>
      </div>
    </section>
  )
}
