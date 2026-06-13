import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'app/admin/page.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Imports
if (!content.includes('HeroPhoto')) {
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

if (!content.includes('ImageIcon')) {
  content = content.replace(
    /Instagram as InstagramIcon/g,
    `Instagram as InstagramIcon, Image as ImageIcon, ArrowUp, ArrowDown`
  );
}

// 2. State
if (!content.includes('heroPhotos, setHeroPhotos')) {
  content = content.replace(
    /const \[activeTab, setActiveTab\] = useState\('services'\)/g,
    `const [activeTab, setActiveTab] = useState('services')
  const [heroPhotos, setHeroPhotos] = useState<HeroPhoto[]>([])
  const [isUploadingHero, setIsUploadingHero] = useState(false)
  const [heroPhotoTitleInput, setHeroPhotoTitleInput] = useState('')`
  );
}

// 3. fetchData
if (content.includes('setSettings(data.settings)')) {
  content = content.replace(
    /setSettings\(data\.settings\)/g,
    `setSettings(data.settings)
        if (data.heroPhotos) setHeroPhotos(data.heroPhotos)`
  );
}

// 4. handleSaveData
if (content.includes("else if (type === 'settings') payload = { settings: data }")) {
  content = content.replace(
    /else if \(type === 'settings'\) payload = \{ settings: data \}/g,
    `else if (type === 'settings') payload = { settings: data }
      else if (type === 'hero') payload = { heroPhotos: data }`
  );
}

// 5. Sidebar tab
if (!content.includes('setActiveTab(\'hero\')')) {
  content = content.replace(
    /setActiveTab\('social'\); setEditingServiceIndex\(null\); \}\}/g,
    `setActiveTab('social'); setEditingServiceIndex(null); }}
            className={\`w-full text-left py-3.5 px-4 rounded-2xl font-medium text-sm flex items-center gap-3 transition-all duration-300 \${activeTab === 'social'
                ? 'bg-dark text-white shadow-md'
                : 'bg-white hover:bg-neutral-100 text-gray hover:text-dark border border-neutral-200/60'
              }\`}
          >
            <InstagramIcon size={18} className={activeTab === 'social' ? 'text-white' : 'text-gray'} />
            Redes Sociais
          </button>
          
          <button
            onClick={() => { setActiveTab('hero'); setEditingServiceIndex(null); }}`
  );

  content = content.replace(
    /<InstagramIcon size=\{18\} className=\{activeTab === 'social' \? 'text-white' : 'text-gray'\} \/>\n            Redes Sociais\n          <\/button>\n          \n          <button\n            onClick=\{\(\) => \{ setActiveTab\('hero'\); setEditingServiceIndex\(null\); \}\}/g,
    `<InstagramIcon size={18} className={activeTab === 'social' ? 'text-white' : 'text-gray'} />
            Redes Sociais
          </button>
          
          <button
            onClick={() => { setActiveTab('hero'); setEditingServiceIndex(null); }}
            className={\`w-full text-left py-3.5 px-4 rounded-2xl font-medium text-sm flex items-center gap-3 transition-all duration-300 \${activeTab === 'hero'
                ? 'bg-dark text-white shadow-md'
                : 'bg-white hover:bg-neutral-100 text-gray hover:text-dark border border-neutral-200/60'
              }\`}
          >
            <ImageIcon size={18} className={activeTab === 'hero' ? 'text-white' : 'text-gray'} />
            Fotos da Capa
          </button>`
  );
}

// 6. Hero Logic
if (!content.includes('handleHeroImageUpload')) {
  const heroLogic = `
  // Hero Logic
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingHero(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'hero')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!res.ok) throw new Error('Falha ao enviar arquivo')

      const { publicUrl } = await res.json()
      
      const newPhoto: HeroPhoto = {
        id: crypto.randomUUID(),
        url: publicUrl,
        title: heroPhotoTitleInput.trim() || file.name,
        sequence: heroPhotos.length + 1
      }

      const updated = [...heroPhotos, newPhoto]
      setHeroPhotos(updated)
      await handleSaveData('hero', updated)
      
      setHeroPhotoTitleInput('')
      if (e.target) e.target.value = ''
      showToast('Foto adicionada ao Hero', 'success')
    } catch (err) {
      console.error(err)
      showToast('Erro ao fazer upload da foto', 'error')
    } finally {
      setIsUploadingHero(false)
    }
  }

  const handleRemoveHeroPhoto = async (index: number) => {
    if (heroPhotos.length <= 1) {
      showToast('É obrigatório ter pelo menos 1 foto no Hero', 'error')
      return
    }
    
    if (confirm('Remover esta foto do carrossel? (Ela não será apagada do storage)')) {
      const updated = heroPhotos.filter((_, i) => i !== index)
        .map((p, i) => ({ ...p, sequence: i + 1 }))
      
      setHeroPhotos(updated)
      await handleSaveData('hero', updated)
    }
  }

  const handleMoveHeroPhoto = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === heroPhotos.length - 1) return

    const updated = [...heroPhotos]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap
    const temp = updated[index]
    updated[index] = updated[swapIndex]
    updated[swapIndex] = temp
    
    // Re-sequence
    const resequenced = updated.map((p, i) => ({ ...p, sequence: i + 1 }))
    
    setHeroPhotos(resequenced)
    await handleSaveData('hero', resequenced)
  }

`;

  content = content.replace(
    /  \/\/ Services Logic/g,
    heroLogic + "  // Services Logic"
  );
}

// 7. Hero Tab Render
if (!content.includes('Hero Tab')) {
  const heroTab = `
        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-neutral-200 animate-fade-in space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-dark">Fotos da Capa (Carrossel)</h2>
                <p className="text-gray text-sm mt-1">Gerencie as imagens de destaque da página inicial</p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/60">
              <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-4">Adicionar Nova Foto</h3>
              
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Título da foto (Opcional - Ex: Estúdio Principal)"
                  value={heroPhotoTitleInput}
                  onChange={(e) => setHeroPhotoTitleInput(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl border border-beige/60 bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                />

                <div className="flex flex-col gap-4 p-4 border border-dashed border-neutral-300 rounded-xl bg-white text-center hover:bg-neutral-50 transition-colors relative">
                  {isUploadingHero ? (
                    <div className="flex flex-col items-center justify-center py-2 text-beige">
                      <div className="w-6 h-6 border-2 border-beige border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-sm font-medium">Enviando foto...</span>
                    </div>
                  ) : (
                    <>
                      <div className="py-4">
                        <ImageIcon size={24} className="text-beige mx-auto mb-2" />
                        <span className="text-sm font-semibold text-dark">Clique para enviar uma foto</span>
                        <p className="text-xs text-gray mt-1">Sobe direto pro R2 e entra no carrossel</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-dark text-sm uppercase tracking-wider">Fotos Atuais no Carrossel</h3>
              
              {heroPhotos.length === 0 ? (
                <div className="text-center py-8 text-gray bg-neutral-50 rounded-2xl border border-neutral-200 border-dashed">
                  Nenhuma foto adicionada.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heroPhotos.map((photo, index) => (
                    <div key={photo.id} className="relative group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="aspect-[4/3] w-full relative bg-neutral-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                        
                        {/* Actions overlay */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleMoveHeroPhoto(index, 'up')}
                            disabled={index === 0}
                            className="p-1.5 bg-white/90 backdrop-blur rounded-lg text-dark hover:bg-white disabled:opacity-50"
                          >
                            <ArrowUp size={16} />
                          </button>
                          <button
                            onClick={() => handleMoveHeroPhoto(index, 'down')}
                            disabled={index === heroPhotos.length - 1}
                            className="p-1.5 bg-white/90 backdrop-blur rounded-lg text-dark hover:bg-white disabled:opacity-50"
                          >
                            <ArrowDown size={16} />
                          </button>
                          <button
                            onClick={() => handleRemoveHeroPhoto(index)}
                            className="p-1.5 bg-red-500/90 backdrop-blur rounded-lg text-white hover:bg-red-600 mt-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="absolute top-2 left-2 bg-dark/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-lg">
                          #{photo.sequence}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-dark truncate">{photo.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

`;

  content = content.replace(
    /        \{\/\* Services Tab \*\/\}/g,
    heroTab + "        {/* Services Tab */}"
  );
}

fs.writeFileSync(file, content);
console.log('app/admin/page.tsx updated for hero!');
