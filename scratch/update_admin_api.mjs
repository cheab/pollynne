import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'app/api/admin/data/route.ts');
let content = fs.readFileSync(file, 'utf8');

// 1. Imports
if (!content.includes('getHeroPhotos')) {
  content = content.replace(
    /getCombos, getAddress, getSettings, saveServices, saveCombos, saveAddress, saveSettings/g,
    `getCombos, getAddress, getSettings, saveServices, saveCombos, saveAddress, saveSettings, getHeroPhotos, saveHeroPhotos`
  );
}

// 2. GET method
if (!content.includes('heroPhotos:')) {
  content = content.replace(
    /const \[services, combos, address, settings\] = await Promise\.all\(\[/g,
    `const [services, combos, address, settings, heroPhotos] = await Promise.all([`
  );
  content = content.replace(
    /getSettings\(\),/g,
    `getSettings(),
      getHeroPhotos(),`
  );
  content = content.replace(
    /return NextResponse\.json\(\{ services, combos, address, settings \}\);/g,
    `return NextResponse.json({ services, combos, address, settings, heroPhotos });`
  );
}

// 3. POST method
if (!content.includes('saveHeroPhotos(body.heroPhotos)')) {
  content = content.replace(
    /if \(body\.settings\) await saveSettings\(body\.settings\);/g,
    `if (body.settings) await saveSettings(body.settings);
    if (body.heroPhotos) await saveHeroPhotos(body.heroPhotos);`
  );
}

fs.writeFileSync(file, content);
console.log('app/api/admin/data/route.ts updated for hero!');
