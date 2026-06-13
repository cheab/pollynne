import { createClient } from '@libsql/client';
import crypto from 'crypto';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL?.trim() || 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN?.trim()
});

async function migrate() {
  try {
    const tableInfo = await client.execute("PRAGMA table_info(hero)");
    const hasId = tableInfo.rows.some(row => row.name === 'id');
    
    if (hasId) {
      const heroCheck = await client.execute("SELECT count(*) as count FROM hero");
      if (heroCheck.rows[0].count > 0) {
        console.log('Hero table already populated. Exiting.');
        process.exit(0);
      }
    }

    const tx = await client.transaction("write");
    try {
      await tx.execute(`
        CREATE TABLE IF NOT EXISTS hero (
          id TEXT PRIMARY KEY,
          url TEXT NOT NULL,
          title TEXT NOT NULL,
          sequence INTEGER NOT NULL
        )
      `);

      // Populate default 7 images
      const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, '') || '';
      for (let i = 1; i <= 7; i++) {
        await tx.execute({
          sql: "INSERT INTO hero (id, url, title, sequence) VALUES (?, ?, ?, ?)",
          args: [crypto.randomUUID(), `${baseUrl}/hero/hero${i}.jpg`, `Hero ${i}`, i]
        });
      }

      await tx.commit();
      console.log('Hero schema migration and population completed successfully!');
    } catch (innerErr) {
      await tx.rollback();
      throw innerErr;
    }
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();
