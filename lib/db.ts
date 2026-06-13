import { createClient } from '@libsql/client';
import crypto from 'crypto';

export interface ServicePhoto {
  id: string;
  url: string;
  title: string;
}

export interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  photos?: ServicePhoto[];
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
  slogan?: string;
  instagramNickname?: string;
  instagramAccessToken?: string;
  instagramBusinessAccountId?: string;
  instagramIsValidated?: boolean;
}

export const defaultSettings: Settings = {
  whatsapp: '553195136154',
  phone: '(31) 99513-6154',
  email: 'contato@pollynne.com.br',
  hours: '09h às 19h',
  days: 'Terça a Sábado',
  slogan: 'Seja seu próprio padrão de beleza',
  instagramNickname: 'pollynne_beauty',
  instagramAccessToken: '',
  instagramBusinessAccountId: '',
  instagramIsValidated: false
};

export const defaultServices: Service[] = [
  {
    id: crypto.randomUUID(),
    icon: '○',
    name: 'Design Premium',
    description: 'Técnica utilizada para preservar o máximo de pelos seus, dando um formato e harmonia a suas sobrancelhas de forma natural.',
    price: 'R$ 30,00',
    duration: '40 min',
    photos: [
      { id: crypto.randomUUID(), url: '/catalog/Design-premium.jpg', title: 'Foto 1' },
      { id: crypto.randomUUID(), url: '/catalog/Design-premium-.jpg', title: 'Foto 2' },
      { id: crypto.randomUUID(), url: '/catalog/Design-premium-_1_.jpg', title: 'Foto 3' }
    ]
  },
  {
    id: crypto.randomUUID(),
    icon: '○',
    name: 'Epilação de Buço',
    description: 'Remova os pelos indesejados do buço de forma rápida, prática e delicada. Acabamento suave e aparência natural.',
    price: 'R$ 15,00',
    duration: '15 min'
  },
  {
    id: crypto.randomUUID(),
    icon: '◆',
    name: 'Brow Lamination',
    description: 'Tratamento que alinha e fixa os fios da sobrancelha, deixando o olhar mais expressivo e harmonioso. Efeito de sobrancelha sempre penteada.',
    price: 'R$ 120,00',
    duration: '4-6 semanas',
    photos: [
      { id: crypto.randomUUID(), url: '/catalog/Brow-Lamination.jpg', title: 'Foto 1' },
      { id: crypto.randomUUID(), url: '/catalog/Brow-Lamination-_1_.jpg', title: 'Foto 2' },
      { id: crypto.randomUUID(), url: '/catalog/Brow-Lamination-e-micro-labial.jpg', title: 'Foto 3' }
    ]
  },
  {
    id: crypto.randomUUID(),
    icon: '○',
    name: 'Design com Tintura',
    description: 'Design personalizado que não afina sua sobrancelha, com técnica exclusiva de tintura.',
    price: 'R$ 45,00',
    duration: '50 min'
  },
  {
    id: crypto.randomUUID(),
    icon: '◆',
    name: 'Nano Art',
    description: 'Técnica para preencher suas falhas com fios realistas, que duram em média 8 meses. Natural e realista para suas sobrancelhas dos sonhos!',
    price: 'R$ 500,00',
    duration: '8 meses'
  },
  {
    id: crypto.randomUUID(),
    icon: '◆',
    name: 'Micro Labial',
    description: 'Melhora a cor natural dos lábios, corrige assimetrias e proporciona um aspecto mais definido. Leve efeito de batom, ideal para o dia a dia.',
    price: 'R$ 500,00',
    duration: 'De 1 a 2 anos',
    photos: [
      { id: crypto.randomUUID(), url: '/catalog/Micro-labial.jpg', title: 'Foto 1' },
      { id: crypto.randomUUID(), url: '/catalog/Micro-labial-_1_.jpg', title: 'Foto 2' },
      { id: crypto.randomUUID(), url: '/catalog/Brow-Lamination-e-micro-labial.jpg', title: 'Foto 3' }
    ]
  },
  {
    id: crypto.randomUUID(),
    icon: '○',
    name: 'Lash Lifting',
    description: 'Tratamento que curva e realça os cílios naturais, deixando o olhar mais aberto e sofisticado. Efeito natural e prático.',
    price: 'R$ 120,00',
    duration: '4-6 semanas'
  },
  {
    id: crypto.randomUUID(),
    icon: '◇',
    name: 'Hidra Color',
    description: 'Tratamento que hidrata profundamente os lábios enquanto realça a cor natural, deixando-os mais macios e saudáveis.',
    price: 'R$ 250,00',
    duration: '2-3 meses'
  },
  {
    id: crypto.randomUUID(),
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

const url = process.env.TURSO_DATABASE_URL?.trim() || "file:./local.db";
const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

const client = createClient({
  url,
  authToken,
});

let initPromise: Promise<void> | null = null;

async function initDb() {
  // Create tables if they don't exist
  await client.batch([
    `CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      icon TEXT NOT NULL,
      description TEXT NOT NULL,
      price TEXT NOT NULL,
      duration TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS services_photos (
      id TEXT PRIMARY KEY,
      service_id TEXT NOT NULL,
      url TEXT NOT NULL,
      title TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS combos (
      name TEXT PRIMARY KEY,
      price TEXT NOT NULL,
      services TEXT NOT NULL,
      description TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS address (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      rua TEXT NOT NULL,
      numero TEXT NOT NULL,
      bairro TEXT NOT NULL,
      cidade TEXT NOT NULL,
      estado TEXT NOT NULL,
      cep TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      whatsapp TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      hours TEXT NOT NULL,
      days TEXT NOT NULL,
      slogan TEXT,
      instagramNickname TEXT,
      instagramAccessToken TEXT,
      instagramBusinessAccountId TEXT,
      instagramIsValidated INTEGER DEFAULT 0
    )`
  ], "write");

  // Check if tables are empty, and if so, seed them
  const servicesCheck = await client.execute("SELECT count(*) as count FROM services");
  if (servicesCheck.rows[0].count === 0) {
    for (const s of defaultServices) {
      await client.execute({
        sql: "INSERT INTO services (id, name, icon, description, price, duration) VALUES (?, ?, ?, ?, ?, ?)",
        args: [s.id, s.name, s.icon, s.description, s.price, s.duration]
      });
      if (s.photos && s.photos.length > 0) {
        for (const p of s.photos) {
          await client.execute({
            sql: "INSERT INTO services_photos (id, service_id, url, title) VALUES (?, ?, ?, ?)",
            args: [p.id, s.id, p.url, p.title]
          });
        }
      }
    }
  }

  const combosCheck = await client.execute("SELECT count(*) as count FROM combos");
  if (combosCheck.rows[0].count === 0) {
    for (const c of defaultCombos) {
      await client.execute({
        sql: "INSERT INTO combos (name, price, services, description) VALUES (?, ?, ?, ?)",
        args: [c.name, c.price, JSON.stringify(c.services), c.description || '']
      });
    }
  }

  const addressCheck = await client.execute("SELECT count(*) as count FROM address WHERE id = 1");
  if (addressCheck.rows[0].count === 0) {
    await client.execute({
      sql: "INSERT INTO address (id, rua, numero, bairro, cidade, estado, cep) VALUES (1, ?, ?, ?, ?, ?, ?)",
      args: [defaultAddress.rua, defaultAddress.numero, defaultAddress.bairro, defaultAddress.cidade, defaultAddress.estado, defaultAddress.cep]
    });
  }

  const settingsCheck = await client.execute("SELECT count(*) as count FROM settings WHERE id = 1");
  if (settingsCheck.rows[0].count === 0) {
    await client.execute({
      sql: `INSERT INTO settings (
        id, whatsapp, phone, email, hours, days, slogan, 
        instagramNickname, instagramAccessToken, instagramBusinessAccountId, instagramIsValidated
      ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        defaultSettings.whatsapp,
        defaultSettings.phone,
        defaultSettings.email,
        defaultSettings.hours,
        defaultSettings.days,
        defaultSettings.slogan || '',
        defaultSettings.instagramNickname || '',
        defaultSettings.instagramAccessToken || '',
        defaultSettings.instagramBusinessAccountId || '',
        defaultSettings.instagramIsValidated ? 1 : 0
      ]
    });
  }
}

function ensureDb() {
  if (!initPromise) {
    initPromise = initDb();
  }
  return initPromise;
}

export async function getServices(): Promise<Service[]> {
  await ensureDb();
  try {
    const servicesResult = await client.execute("SELECT * FROM services");
    const photosResult = await client.execute("SELECT * FROM services_photos");
    
    const photosByService: Record<string, ServicePhoto[]> = {};
    for (const row of photosResult.rows) {
      const sId = row.service_id as string;
      if (!photosByService[sId]) photosByService[sId] = [];
      photosByService[sId].push({
        id: row.id as string,
        url: row.url as string,
        title: row.title as string
      });
    }

    return servicesResult.rows.map(row => ({
      id: row.id as string,
      name: row.name as string,
      icon: row.icon as string,
      description: row.description as string,
      price: row.price as string,
      duration: row.duration as string,
      photos: photosByService[row.id as string] || []
    }));
  } catch (err) {
    console.error('Error getting services:', err);
    return defaultServices;
  }
}

export async function saveServices(services: Service[]): Promise<boolean> {
  await ensureDb();
  try {
    const tx = await client.transaction("write");
    try {
      await tx.execute("DELETE FROM services");
      await tx.execute("DELETE FROM services_photos");
      for (const s of services) {
        await tx.execute({
          sql: "INSERT INTO services (id, name, icon, description, price, duration) VALUES (?, ?, ?, ?, ?, ?)",
          args: [s.id, s.name, s.icon, s.description, s.price, s.duration]
        });
        if (s.photos && s.photos.length > 0) {
          for (const p of s.photos) {
            await tx.execute({
              sql: "INSERT INTO services_photos (id, service_id, url, title) VALUES (?, ?, ?, ?)",
              args: [p.id, s.id, p.url, p.title]
            });
          }
        }
      }
      await tx.commit();
      return true;
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  } catch (err) {
    console.error('Error saving services:', err);
    return false;
  }
}

export async function getCombos(): Promise<Combo[]> {
  await ensureDb();
  try {
    const result = await client.execute("SELECT * FROM combos");
    return result.rows.map(row => ({
      name: row.name as string,
      price: row.price as string,
      services: JSON.parse(row.services as string),
      description: row.description as string || undefined
    }));
  } catch (err) {
    console.error('Error getting combos:', err);
    return defaultCombos;
  }
}

export async function saveCombos(combos: Combo[]): Promise<boolean> {
  await ensureDb();
  try {
    const tx = await client.transaction("write");
    try {
      await tx.execute("DELETE FROM combos");
      for (const c of combos) {
        await tx.execute({
          sql: "INSERT INTO combos (name, price, services, description) VALUES (?, ?, ?, ?)",
          args: [c.name, c.price, JSON.stringify(c.services), c.description || '']
        });
      }
      await tx.commit();
      return true;
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  } catch (err) {
    console.error('Error saving combos:', err);
    return false;
  }
}

export async function getAddress(): Promise<Address> {
  await ensureDb();
  try {
    const result = await client.execute("SELECT * FROM address WHERE id = 1");
    if (result.rows.length === 0) return defaultAddress;
    const row = result.rows[0];
    return {
      rua: row.rua as string,
      numero: row.numero as string,
      bairro: row.bairro as string,
      cidade: row.cidade as string,
      estado: row.estado as string,
      cep: row.cep as string
    };
  } catch (err) {
    console.error('Error getting address:', err);
    return defaultAddress;
  }
}

export async function saveAddress(address: Address): Promise<boolean> {
  await ensureDb();
  try {
    await client.execute({
      sql: `INSERT OR REPLACE INTO address (id, rua, numero, bairro, cidade, estado, cep) 
            VALUES (1, ?, ?, ?, ?, ?, ?)`,
      args: [address.rua, address.numero, address.bairro, address.cidade, address.estado, address.cep]
    });
    return true;
  } catch (err) {
    console.error('Error saving address:', err);
    return false;
  }
}

export async function getSettings(): Promise<Settings> {
  await ensureDb();
  try {
    const result = await client.execute("SELECT * FROM settings WHERE id = 1");
    if (result.rows.length === 0) return defaultSettings;
    const row = result.rows[0];
    return {
      whatsapp: row.whatsapp as string,
      phone: row.phone as string,
      email: row.email as string,
      hours: row.hours as string,
      days: row.days as string,
      slogan: row.slogan as string || undefined,
      instagramNickname: row.instagramNickname as string || undefined,
      instagramAccessToken: row.instagramAccessToken as string || undefined,
      instagramBusinessAccountId: row.instagramBusinessAccountId as string || undefined,
      instagramIsValidated: row.instagramIsValidated === 1
    };
  } catch (err) {
    console.error('Error getting settings:', err);
    return defaultSettings;
  }
}

export async function saveSettings(settings: Settings): Promise<boolean> {
  await ensureDb();
  try {
    await client.execute({
      sql: `INSERT OR REPLACE INTO settings (
        id, whatsapp, phone, email, hours, days, slogan, 
        instagramNickname, instagramAccessToken, instagramBusinessAccountId, instagramIsValidated
      ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        settings.whatsapp,
        settings.phone,
        settings.email,
        settings.hours,
        settings.days,
        settings.slogan || '',
        settings.instagramNickname || '',
        settings.instagramAccessToken || '',
        settings.instagramBusinessAccountId || '',
        settings.instagramIsValidated ? 1 : 0
      ]
    });
    return true;
  } catch (err) {
    console.error('Error saving settings:', err);
    return false;
  }
}

