import { createClient } from '@libsql/client';
import crypto from 'crypto';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL?.trim() || 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN?.trim()
});

async function migrate() {
  try {
    // Check if `id` already exists in `services`
    const tableInfo = await client.execute("PRAGMA table_info(services)");
    const hasId = tableInfo.rows.some(row => row.name === 'id');
    
    if (hasId) {
      console.log('Migration already applied. `services` table already has `id` column.');
      process.exit(0);
    }

    const tx = await client.transaction("write");
    try {
      await tx.execute("DROP TABLE IF EXISTS services_old");
      await tx.execute("ALTER TABLE services RENAME TO services_old");

      await tx.execute(`
        CREATE TABLE services (
          id TEXT PRIMARY KEY,
          name TEXT UNIQUE NOT NULL,
          icon TEXT NOT NULL,
          description TEXT NOT NULL,
          price TEXT NOT NULL,
          duration TEXT NOT NULL
        )
      `);

      const oldServices = await tx.execute("SELECT * FROM services_old");
      const nameToId = {};
      
      for (const row of oldServices.rows) {
        const newId = crypto.randomUUID();
        nameToId[row.name ] = newId;

        await tx.execute({
          sql: "INSERT INTO services (id, name, icon, description, price, duration) VALUES (?, ?, ?, ?, ?, ?)",
          args: [newId, row.name, row.icon, row.description, row.price, row.duration]
        });
      }

      await tx.execute("DROP TABLE IF EXISTS services_photos_old");
      await tx.execute("ALTER TABLE services_photos RENAME TO services_photos_old");

      await tx.execute(`
        CREATE TABLE services_photos (
          id TEXT PRIMARY KEY,
          service_id TEXT NOT NULL,
          url TEXT NOT NULL,
          title TEXT NOT NULL
        )
      `);

      const oldPhotos = await tx.execute("SELECT * FROM services_photos_old");
      for (const photo of oldPhotos.rows) {
        const oldName = photo.service_name ;
        const newServiceId = nameToId[oldName];
        if (newServiceId) {
          await tx.execute({
            sql: "INSERT INTO services_photos (id, service_id, url, title) VALUES (?, ?, ?, ?)",
            args: [photo.id, newServiceId, photo.url, photo.title]
          });
        }
      }

      await tx.execute("DROP TABLE services_old");
      await tx.execute("DROP TABLE services_photos_old");

      await tx.commit();
      console.log('Schema migration completed successfully!');
    } catch (innerErr) {
      await tx.rollback();
      throw innerErr;
    }
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();
