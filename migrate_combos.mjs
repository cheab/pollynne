import { createClient } from '@libsql/client';
import crypto from 'crypto';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL?.trim() || 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN?.trim()
});

async function migrate() {
  try {
    const tableInfo = await client.execute("PRAGMA table_info(combos)");
    const hasId = tableInfo.rows.some(row => row.name === 'id');
    
    if (hasId) {
      console.log('Migration already applied. `combos` table already has `id` column.');
      process.exit(0);
    }

    const tx = await client.transaction("write");
    try {
      await tx.execute("DROP TABLE IF EXISTS combos_old");
      await tx.execute("ALTER TABLE combos RENAME TO combos_old");

      await tx.execute(`
        CREATE TABLE combos (
          id TEXT PRIMARY KEY,
          name TEXT UNIQUE NOT NULL,
          price TEXT NOT NULL,
          description TEXT
        )
      `);

      await tx.execute(`
        CREATE TABLE IF NOT EXISTS combo_services (
          id TEXT PRIMARY KEY,
          combo_id TEXT NOT NULL,
          service_id TEXT NOT NULL
        )
      `);

      // We need to map service names to service IDs for the old combo data
      const servicesRes = await tx.execute("SELECT id, name FROM services");
      const nameToServiceId = {};
      for (const s of servicesRes.rows) {
        nameToServiceId[s.name ] = s.id ;
      }

      const oldCombos = await tx.execute("SELECT * FROM combos_old");
      
      for (const row of oldCombos.rows) {
        const comboId = crypto.randomUUID();

        await tx.execute({
          sql: "INSERT INTO combos (id, name, price, description) VALUES (?, ?, ?, ?)",
          args: [comboId, row.name, row.price, row.description || '']
        });

        let serviceNames = [];
        try {
          if (row.services) {
            serviceNames = JSON.parse(row.services );
          }
        } catch (e) {
          console.error('Error parsing services JSON for combo', row.name);
        }

        if (Array.isArray(serviceNames)) {
          for (const sName of serviceNames) {
            const sId = nameToServiceId[sName];
            if (sId) {
              await tx.execute({
                sql: "INSERT INTO combo_services (id, combo_id, service_id) VALUES (?, ?, ?)",
                args: [crypto.randomUUID(), comboId, sId]
              });
            } else {
              console.warn(`Service name "${sName}" not found for combo "${row.name}". Ignoring relation.`);
            }
          }
        }
      }

      await tx.execute("DROP TABLE combos_old");
      await tx.commit();
      console.log('Combos schema migration completed successfully!');
    } catch (innerErr) {
      await tx.rollback();
      throw innerErr;
    }
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();
