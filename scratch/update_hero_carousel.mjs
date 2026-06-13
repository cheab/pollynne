import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'components/HeroCarousel.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Remove static array
content = content.replace(
  /const getHeroImage[\s\S]*?\];/g,
  `import { HeroPhoto } from '@/lib/db';`
);

// 2. Update Props
content = content.replace(
  /export default function HeroCarousel\(\{ settings \}: \{ settings\?: Settings \}\) \{/g,
  `export default function HeroCarousel({ settings, photos }: { settings?: Settings, photos: HeroPhoto[] }) {
  const images = photos.length > 0 ? photos.map(p => p.url) : ['/hero/hero1.jpg']; // Fallback`
);

// 3. Fix eslint issues if any (it might complain if images is not defined at top level for variants, but it is not used in variants)

fs.writeFileSync(file, content);
console.log('components/HeroCarousel.tsx updated!');
