import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'lib/db.ts');
let content = fs.readFileSync(file, 'utf8');

// 1. Interfaces
if (!content.includes('export interface HeroPhoto')) {
  content = content.replace(
    /export interface ServicePhoto \{/g,
    `export interface HeroPhoto {
  id: string;
  url: string;
  title: string;
  sequence: number;
}

export interface ServicePhoto {`
  );
}

// 2. initDb
if (!content.includes('CREATE TABLE IF NOT EXISTS hero')) {
  content = content.replace(
    /CREATE TABLE IF NOT EXISTS combo_services \([\s\S]*?\)`/g,
    `CREATE TABLE IF NOT EXISTS combo_services (
      id TEXT PRIMARY KEY,
      combo_id TEXT NOT NULL,
      service_id TEXT NOT NULL
    )\`,
    \`CREATE TABLE IF NOT EXISTS hero (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      sequence INTEGER NOT NULL
    )\``
  );
}

// 3. getHeroPhotos & saveHeroPhotos
if (!content.includes('export async function getHeroPhotos()')) {
  content = content + `

export async function getHeroPhotos(): Promise<HeroPhoto[]> {
  await ensureDb();
  try {
    const result = await client.execute("SELECT * FROM hero ORDER BY sequence ASC");
    return result.rows.map(row => ({
      id: row.id as string,
      url: row.url as string,
      title: row.title as string,
      sequence: row.sequence as number
    }));
  } catch (err) {
    console.error('Error getting hero photos:', err);
    return [];
  }
}

export async function saveHeroPhotos(photos: HeroPhoto[]): Promise<boolean> {
  await ensureDb();
  try {
    const tx = await client.transaction("write");
    try {
      await tx.execute("DELETE FROM hero");
      for (const p of photos) {
        await tx.execute({
          sql: "INSERT INTO hero (id, url, title, sequence) VALUES (?, ?, ?, ?)",
          args: [p.id, p.url, p.title, p.sequence]
        });
      }
      await tx.commit();
      return true;
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  } catch (err) {
    console.error('Error saving hero photos:', err);
    return false;
  }
}
`;
}

fs.writeFileSync(file, content);
console.log('lib/db.ts updated for hero!');
