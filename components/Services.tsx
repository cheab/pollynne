import ServiceCard from './ServiceCard'

export const services = [
  {
    icon: '○',
    name: 'Design Premium',
    description: 'Técnica utilizada para preservar o máximo de pelos seus, dando um formato e harmonia a suas sobrancelhas de forma natural.',
    price: 'R$ 30,00',
    duration: '40 min',
  },
  {
    icon: '○',
    name: 'Epilação de Buço',
    description: 'Remova os pelos indesejados do buço de forma rápida, prática e delicada. Acabamento suave e aparência natural.',
    price: 'R$ 15,00',
    duration: '15 min',
  },
  {
    icon: '◆',
    name: 'Brow Lamination',
    description: 'Tratamento que alinha e fixa os fios da sobrancelha, deixando o olhar mais expressivo e harmonioso. Efeito de sobrancelha sempre penteada.',
    price: 'R$ 120,00',
    duration: '4-6 semanas',
  },
  {
    icon: '○',
    name: 'Design com Tintura',
    description: 'Design personalizado que não afina sua sobrancelha, com técnica exclusiva de tintura.',
    price: 'R$ 45,00',
    duration: '50 min',
  },
  {
    icon: '◆',
    name: 'Nano Art',
    description: 'Técnica para preencher suas falhas com fios realistas, que duram em média 8 meses. Natural e realista para suas sobrancelhas dos sonhos!',
    price: 'R$ 500,00',
    duration: '8 meses',
  },
  {
    icon: '◆',
    name: 'Micro Labial',
    description: 'Melhora a cor natural dos lábios, corrige assimetrias e proporciona um aspecto mais definido. Leve efeito de batom, ideal para o dia a dia.',
    price: 'R$ 500,00',
    duration: 'De 1 a 2 anos',
  },
  {
    icon: '○',
    name: 'Lash Lifting',
    description: 'Tratamento que curva e realça os cílios naturais, deixando o olhar mais aberto e sofisticado. Efeito natural e prático.',
    price: 'R$ 120,00',
    duration: '4-6 semanas',
  },
  {
    icon: '◇',
    name: 'Hidra Color',
    description: 'Tratamento que hidrata profundamente os lábios enquanto realça a cor natural, deixando-os mais macios e saudáveis.',
    price: 'R$ 250,00',
    duration: '2-3 meses',
  },
  {
    icon: '◇',
    name: 'Hidra Lips',
    description: 'Tratamento que melhora o aspect dos lábios, deixando-os profundamente hidratados e saudáveis com aspecto revitalizado.',
    price: 'R$ 150,00',
    duration: '2-3 meses',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
            Nossos Serviços
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Oferecemos uma variedade de tratamentos de beleza especializados, com foco em resultado natural e duradouro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Combos */}
        <div className="mt-16 md:mt-24 bg-beige-light rounded-2xl p-8 md:p-12">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            Combos Especiais
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-display font-bold text-lg text-dark mb-2">
                4 Sessões Hidra Color
              </h4>
              <p className="text-gray text-sm mb-4">Pacote de hidratação profunda para os lábios</p>
              <p className="font-display font-bold text-2xl text-dark">R$ 850,00</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-display font-bold text-lg text-dark mb-2">
                Brow + Lash
              </h4>
              <p className="text-gray text-sm mb-4">Brow Lamination + Lash lifting com brinde</p>
              <p className="font-display font-bold text-2xl text-dark">R$ 200,00</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-display font-bold text-lg text-dark mb-2">
                Design + Buço
              </h4>
              <p className="text-gray text-sm mb-4">Design com tintura + Epilação de buço</p>
              <p className="font-display font-bold text-2xl text-dark">R$ 50,00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
