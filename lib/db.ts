// In-memory local fallback store for development
const globalStore = global as any;
if (!globalStore.db) {
  globalStore.db = {
    services: null,
    combos: null,
    address: null,
    settings: null,
  };
}

export interface Service {
  icon: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  images?: string[];
}

export interface Combo {
  name: string;
  price: string;
  services: string[]; // service names
  description?: string;
}

export interface Address {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Settings {
  whatsapp: string;
  phone: string;
  email: string;
  hours: string;
  days: string;
}

export const defaultSettings: Settings = {
  whatsapp: '553195136154',
  phone: '(31) 99513-6154',
  email: 'contato@pollynne.com.br',
  hours: '09h às 19h',
  days: 'Terça a Sábado'
};

export const defaultServices: Service[] = [
  {
    icon: '○',
    name: 'Design Premium',
    description: 'Técnica utilizada para preservar o máximo de pelos seus, dando um formato e harmonia a suas sobrancelhas de forma natural.',
    price: 'R$ 30,00',
    duration: '40 min',
    images: [
      '/catalog/Design-premium.jpg',
      '/catalog/Design-premium-.jpg',
      '/catalog/Design-premium-_1_.jpg'
    ]
  },
  {
    icon: '○',
    name: 'Epilação de Buço',
    description: 'Remova os pelos indesejados do buço de forma rápida, prática e delicada. Acabamento suave e aparência natural.',
    price: 'R$ 15,00',
    duration: '15 min'
  },
  {
    icon: '◆',
    name: 'Brow Lamination',
    description: 'Tratamento que alinha e fixa os fios da sobrancelha, deixando o olhar mais expressivo e harmonioso. Efeito de sobrancelha sempre penteada.',
    price: 'R$ 120,00',
    duration: '4-6 semanas',
    images: [
      '/catalog/Brow-Lamination.jpg',
      '/catalog/Brow-Lamination-_1_.jpg',
      '/catalog/Brow-Lamination-e-micro-labial.jpg'
    ]
  },
  {
    icon: '○',
    name: 'Design com Tintura',
    description: 'Design personalizado que não afina sua sobrancelha, com técnica exclusiva de tintura.',
    price: 'R$ 45,00',
    duration: '50 min'
  },
  {
    icon: '◆',
    name: 'Nano Art',
    description: 'Técnica para preencher suas falhas com fios realistas, que duram em média 8 meses. Natural e realista para suas sobrancelhas dos sonhos!',
    price: 'R$ 500,00',
    duration: '8 meses'
  },
  {
    icon: '◆',
    name: 'Micro Labial',
    description: 'Melhora a cor natural dos lábios, corrige assimetrias e proporciona um aspecto mais definido. Leve efeito de batom, ideal para o dia a dia.',
    price: 'R$ 500,00',
    duration: 'De 1 a 2 anos',
    images: [
      '/catalog/Micro-labial.jpg',
      '/catalog/Micro-labial-_1_.jpg',
      '/catalog/Brow-Lamination-e-micro-labial.jpg'
    ]
  },
  {
    icon: '○',
    name: 'Lash Lifting',
    description: 'Tratamento que curva e realça os cílios naturais, deixando o olhar mais aberto e sofisticado. Efeito natural e prático.',
    price: 'R$ 120,00',
    duration: '4-6 semanas'
  },
  {
    icon: '◇',
    name: 'Hidra Color',
    description: 'Tratamento que hidrata profundamente os lábios enquanto realça a cor natural, deixando-os mais macios e saudáveis.',
    price: 'R$ 250,00',
    duration: '2-3 meses'
  },
  {
    icon: '◇',
    name: 'Hidra Lips',
    description: 'Tratamento que melhora o aspecto dos lábios, deixando-os profundamente hidratados e saudáveis com aspecto revitalizado.',
    price: 'R$ 150,00',
    duration: '2-3 meses'
  }
];

export const defaultCombos: Combo[] = [
  {
    name: '4 Sessões Hidra Color',
    price: 'R$ 850,00',
    services: ['Hidra Color'],
    description: 'Pacote de hidratação profunda para os lábios'
  },
  {
    name: 'Brow + Lash',
    price: 'R$ 200,00',
    services: ['Brow Lamination', 'Lash Lifting'],
    description: 'Brow Lamination + Lash lifting com brinde'
  },
  {
    name: 'Design + Buço',
    price: 'R$ 50,00',
    services: ['Design com Tintura', 'Epilação de Buço'],
    description: 'Design com tintura + Epilação de buço'
  }
];

export const defaultAddress: Address = {
  rua: 'Centro',
  numero: 'S/N',
  bairro: 'Centro',
  cidade: 'Jequitinhonha',
  estado: 'MG',
  cep: '39960-000'
};

async function runKVCommand(command: string[]) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command),
      next: { revalidate: 0 }
    });
    if (!res.ok) {
      console.error('KV Error:', res.statusText);
      return null;
    }
    const data = await res.json();
    return data.result;
  } catch (err) {
    console.error('KV Fetch Error:', err);
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  const result = await runKVCommand(['GET', 'services']);
  if (result) {
    try {
      return JSON.parse(result);
    } catch {
      return defaultServices;
    }
  }
  
  if (!globalStore.db.services) {
    globalStore.db.services = [...defaultServices];
  }
  return globalStore.db.services;
}

export async function saveServices(services: Service[]): Promise<boolean> {
  const success = await runKVCommand(['SET', 'services', JSON.stringify(services)]);
  if (success !== null) return true;

  globalStore.db.services = services;
  return true;
}

export async function getCombos(): Promise<Combo[]> {
  const result = await runKVCommand(['GET', 'combos']);
  if (result) {
    try {
      return JSON.parse(result);
    } catch {
      return defaultCombos;
    }
  }

  if (!globalStore.db.combos) {
    globalStore.db.combos = [...defaultCombos];
  }
  return globalStore.db.combos;
}

export async function saveCombos(combos: Combo[]): Promise<boolean> {
  const success = await runKVCommand(['SET', 'combos', JSON.stringify(combos)]);
  if (success !== null) return true;

  globalStore.db.combos = combos;
  return true;
}

export async function getAddress(): Promise<Address> {
  const result = await runKVCommand(['GET', 'address']);
  if (result) {
    try {
      return JSON.parse(result);
    } catch {
      return defaultAddress;
    }
  }

  if (!globalStore.db.address) {
    globalStore.db.address = { ...defaultAddress };
  }
  return globalStore.db.address;
}

export async function saveAddress(address: Address): Promise<boolean> {
  const success = await runKVCommand(['SET', 'address', JSON.stringify(address)]);
  if (success !== null) return true;

  globalStore.db.address = address;
  return true;
}

export async function getSettings(): Promise<Settings> {
  const result = await runKVCommand(['GET', 'settings']);
  if (result) {
    try {
      return JSON.parse(result);
    } catch {
      return defaultSettings;
    }
  }

  if (!globalStore.db.settings) {
    globalStore.db.settings = { ...defaultSettings };
  }
  return globalStore.db.settings;
}

export async function saveSettings(settings: Settings): Promise<boolean> {
  const success = await runKVCommand(['SET', 'settings', JSON.stringify(settings)]);
  if (success !== null) return true;

  globalStore.db.settings = settings;
  return true;
}
