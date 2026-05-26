'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  LogOut,
  MapPin,
  Sparkles,
  Clock,
  Coins,
  Loader2,
  User,
  Lock,
  Check,
  AlertCircle,
  X,
  PlusCircle,
  Scissors
} from 'lucide-react'

// Types matched with lib/db.ts
interface Service {
  icon: string
  name: string
  description: string
  price: string
  duration: string
  images?: string[]
}

interface Combo {
  name: string
  price: string
  services: string[]
  description?: string;
}

interface Address {
  rua: string
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export default function AdminPage() {
  // Auth state
  const [isLogged, setIsLogged] = useState<boolean | null>(null) // null = loading
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Data state
  const [services, setServices] = useState<Service[]>([])
  const [combos, setCombos] = useState<Combo[]>([])
  const [address, setAddress] = useState<Address>({
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  })
  interface Settings {
    whatsapp: string
    phone: string
    email: string
    hours: string
    days: string
    slogan?: string
  }
  const [settings, setSettings] = useState<Settings>({
    whatsapp: '',
    phone: '',
    email: '',
    hours: '',
    days: '',
    slogan: ''
  })

  // UI state
  const [activeTab, setActiveTab] = useState<'services' | 'combos' | 'address' | 'settings'>('services')
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Service form state (for editing/creating)
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null) // null = not editing, -1 = creating new
  const [serviceForm, setServiceForm] = useState<Service>({
    icon: '○',
    name: '',
    description: '',
    price: '',
    duration: '',
    images: []
  })
  const [imageInput, setImageInput] = useState('')

  // Check authentication on load
  useEffect(() => {
    checkAuth()
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
  }

  const checkAuth = async () => {
    setIsLoadingData(true)
    try {
      const res = await fetch('/api/admin/check-auth')
      if (res.status === 200) {
        setIsLogged(true)
        fetchData()
      } else {
        setIsLogged(false)
      }
    } catch (err) {
      setIsLogged(false)
    } finally {
      setIsLoadingData(false)
    }
  }

  const fetchData = async () => {
    setIsLoadingData(true)
    try {
      const res = await fetch('/api/admin/data')
      if (res.status === 200) {
        const data = await res.json()
        setServices(data.services || [])
        setCombos(data.combos || [])
        setAddress(data.address || { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '' })
        setSettings({
          whatsapp: data.settings?.whatsapp || '',
          phone: data.settings?.phone || '',
          email: data.settings?.email || '',
          hours: data.settings?.hours || '',
          days: data.settings?.days || '',
          slogan: data.settings?.slogan || ''
        })
      }
    } catch (err) {
      showToast('Erro ao carregar dados do servidor', 'error')
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      })

      if (res.ok) {
        showToast('Login realizado com sucesso!')
        setIsLogged(true)
        fetchData()
      } else {
        const data = await res.json()
        setLoginError(data.error || 'Credenciais incorretas')
      }
    } catch (err) {
      setLoginError('Erro ao conectar ao servidor')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      setIsLogged(false)
      setUsernameInput('')
      setPasswordInput('')
      showToast('Sessão encerrada.')
    } catch (err) {
      showToast('Erro ao encerrar sessão', 'error')
    }
  }

  const handleSaveData = async (type: 'services' | 'combos' | 'address' | 'settings', payload: any) => {
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data: payload })
      })

      if (res.ok) {
        showToast('Dados salvos com sucesso!')
        fetchData()
        return true;
      } else if (res.status === 401) {
        showToast('Sessão expirada. Por favor, faça login novamente.', 'error')
        setIsLogged(false)
        return false;
      } else {
        const data = await res.json()
        showToast(data.error || 'Erro ao salvar os dados', 'error')
        return false;
      }
    } catch (err) {
      showToast('Erro ao conectar ao servidor', 'error')
      return false;
    }
  }

  // Address logic (CEP lookup via ViaCEP)
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawCep = e.target.value.replace(/\D/g, '')
    setAddress(prev => ({ ...prev, cep: e.target.value }))

    if (rawCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setAddress(prev => ({
            ...prev,
            rua: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }))
          showToast('Endereço auto-preenchido!')
        } else {
          showToast('CEP não encontrado', 'error')
        }
      } catch (err) {
        showToast('Erro ao buscar o CEP', 'error')
      }
    }
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    handleSaveData('address', address)
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    handleSaveData('settings', settings)
  }

  // Services CRUD
  const startEditingService = (index: number) => {
    setEditingServiceIndex(index)
    setServiceForm({ ...services[index] })
    setImageInput('')
  }

  const startCreatingService = () => {
    setEditingServiceIndex(-1)
    setServiceForm({
      icon: '○',
      name: '',
      description: '',
      price: '',
      duration: '',
      images: []
    })
    setImageInput('')
  }

  const handleSaveServiceForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!serviceForm.name || !serviceForm.price) {
      showToast('Preencha pelo menos o Nome e o Preço', 'error')
      return
    }

    let updatedList = [...services]
    if (editingServiceIndex === -1) {
      // Create
      updatedList.push(serviceForm)
    } else if (editingServiceIndex !== null) {
      // Edit
      updatedList[editingServiceIndex] = serviceForm
    }

    const success = await handleSaveData('services', updatedList)
    if (success) {
      setEditingServiceIndex(null)
    }
  }

  const handleDeleteService = async (index: number) => {
    if (confirm(`Deseja realmente excluir o serviço "${services[index].name}"?`)) {
      const updatedList = services.filter((_, i) => i !== index)
      await handleSaveData('services', updatedList)
    }
  }

  const addImageUrl = () => {
    if (!imageInput.trim()) return
    setServiceForm(prev => ({
      ...prev,
      images: [...(prev.images || []), imageInput.trim()]
    }))
    setImageInput('')
  }

  const removeImageUrl = (urlIndex: number) => {
    setServiceForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== urlIndex)
    }))
  }

  // Combos Logic
  const handleComboChange = (comboIndex: number, field: string, value: any) => {
    const updated = [...combos]
    // Ensure the combo object exists
    if (!updated[comboIndex]) {
      updated[comboIndex] = { name: '', price: '', services: [] }
    }
    updated[comboIndex] = { ...updated[comboIndex], [field]: value }
    setCombos(updated)
  }

  const handleToggleServiceInCombo = (comboIndex: number, serviceName: string) => {
    const updated = [...combos]
    if (!updated[comboIndex]) {
      updated[comboIndex] = { name: '', price: '', services: [] }
    }
    const currentServices = updated[comboIndex].services || []
    let nextServices = []

    if (currentServices.includes(serviceName)) {
      nextServices = currentServices.filter(s => s !== serviceName)
    } else {
      if (currentServices.length >= 4) {
        showToast('Um combo pode ter no máximo 4 serviços', 'error')
        return
      }
      nextServices = [...currentServices, serviceName]
    }

    updated[comboIndex] = { ...updated[comboIndex], services: nextServices }
    setCombos(updated)
  }

  const handleSaveCombos = (e: React.FormEvent) => {
    e.preventDefault()
    // Make sure we have exactly 3 combos
    const finalizedCombos = [
      combos[0] || { name: 'Combo 1', price: 'R$ 0,00', services: [] },
      combos[1] || { name: 'Combo 2', price: 'R$ 0,00', services: [] },
      combos[2] || { name: 'Combo 3', price: 'R$ 0,00', services: [] }
    ]
    handleSaveData('combos', finalizedCombos)
  }

  // Render loading state
  if (isLogged === null || (isLogged && isLoadingData && services.length === 0)) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-beige-light/30">
        <Loader2 className="h-10 w-10 text-beige animate-spin mb-4" />
        <span className="text-gray font-medium tracking-wide">Carregando painel...</span>
      </div>
    )
  }

  // Render Login page if not logged in
  if (!isLogged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-light via-white to-beige-light/50 p-4">
        {/* Floating background blobs for premium aesthetics */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-beige/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-beige-light/40 rounded-full blur-3xl -z-10" />

        <div className="w-full max-w-md bg-white/75 backdrop-blur-md border border-white/40 shadow-2xl rounded-3xl p-8 relative">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl text-dark mb-2">Painel Restrito</h1>
            <p className="text-gray text-sm">Entre com suas credenciais de administração</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Usuário</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray/50">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Seu usuário"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige/60 bg-white/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Senha</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray/50">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="Sua senha"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige/60 bg-white/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all duration-300 text-sm"
                />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 text-red-600 border border-red-100 text-xs font-medium animate-shake">
                <AlertCircle size={16} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 rounded-xl bg-dark text-white hover:bg-gray transition-colors duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Autenticando...
                </>
              ) : (
                'Entrar no Painel'
              )}
            </button>
          </form>
        </div>

        {/* Global Toast */}
        {toast && (
          <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-2xl flex items-center gap-3 shadow-lg border animate-slide-in ${
            toast.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'
          }`}>
            {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        )}
      </div>
    )
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-body">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-dark rounded-xl flex items-center justify-center text-white font-bold text-lg">P</div>
          <div>
            <h1 className="font-display font-bold text-lg text-dark">Pollynne Beauty</h1>
            <p className="text-[10px] text-gray uppercase tracking-widest font-semibold">Painel de Controle</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-gray hover:text-dark transition-colors px-3 py-2 rounded-xl hover:bg-neutral-100"
        >
          <LogOut size={16} />
          Sair
        </button>
      </header>

      <div className="flex-grow flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-8 gap-8">
        {/* Sidebar Navigation */}
        <aside className="md:w-64 shrink-0 space-y-2">
          <button
            onClick={() => { setActiveTab('services'); setEditingServiceIndex(null); }}
            className={`w-full text-left py-3.5 px-4 rounded-2xl font-medium text-sm flex items-center gap-3 transition-all duration-300 ${
              activeTab === 'services'
                ? 'bg-dark text-white shadow-md'
                : 'bg-white hover:bg-neutral-100 text-gray hover:text-dark border border-neutral-200/60'
            }`}
          >
            <Scissors size={18} />
            Serviços
          </button>
          <button
            onClick={() => { setActiveTab('combos'); setEditingServiceIndex(null); }}
            className={`w-full text-left py-3.5 px-4 rounded-2xl font-medium text-sm flex items-center gap-3 transition-all duration-300 ${
              activeTab === 'combos'
                ? 'bg-dark text-white shadow-md'
                : 'bg-white hover:bg-neutral-100 text-gray hover:text-dark border border-neutral-200/60'
            }`}
          >
            <Sparkles size={18} />
            Combos
          </button>
          <button
            onClick={() => { setActiveTab('address'); setEditingServiceIndex(null); }}
            className={`w-full text-left py-3.5 px-4 rounded-2xl font-medium text-sm flex items-center gap-3 transition-all duration-300 ${
              activeTab === 'address'
                ? 'bg-dark text-white shadow-md'
                : 'bg-white hover:bg-neutral-100 text-gray hover:text-dark border border-neutral-200/60'
            }`}
          >
            <MapPin size={18} />
            Endereço
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setEditingServiceIndex(null); }}
            className={`w-full text-left py-3.5 px-4 rounded-2xl font-medium text-sm flex items-center gap-3 transition-all duration-300 ${
              activeTab === 'settings'
                ? 'bg-dark text-white shadow-md'
                : 'bg-white hover:bg-neutral-100 text-gray hover:text-dark border border-neutral-200/60'
            }`}
          >
            <Clock size={18} />
            Horários & Contato
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-grow bg-white border border-neutral-200/70 rounded-3xl p-6 md:p-8 shadow-sm">
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div>
              {editingServiceIndex === null ? (
                <>
                  <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
                    <div>
                      <h2 className="font-display font-bold text-2xl text-dark">Serviços Cadastrados</h2>
                      <p className="text-gray text-xs mt-1">Gerencie a lista de tratamentos do site</p>
                    </div>
                    <button
                      onClick={startCreatingService}
                      className="btn-primary py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm font-medium hover:scale-[1.02] transition-transform"
                    >
                      <Plus size={16} />
                      Novo Serviço
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="border border-neutral-200/80 rounded-2xl p-5 hover:border-neutral-300 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <span className="h-9 w-9 rounded-lg bg-beige/30 text-dark flex items-center justify-center font-bold text-lg select-none">
                              {service.icon}
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => startEditingService(index)}
                                className="p-2 text-gray hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteService(index)}
                                className="p-2 text-gray hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Excluir"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <h3 className="font-display font-bold text-lg text-dark mb-1.5">{service.name}</h3>
                          <p className="text-gray text-xs leading-relaxed line-clamp-3 mb-4">{service.description}</p>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-neutral-100 mt-2 text-xs font-semibold text-gray/95">
                          <span className="flex items-center gap-1">
                            <Coins size={14} className="text-beige" />
                            {service.price}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} className="text-beige" />
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Service Form (Editing or Creating) */
                <form onSubmit={handleSaveServiceForm} className="space-y-6">
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-6">
                    <div>
                      <h2 className="font-display font-bold text-2xl text-dark">
                        {editingServiceIndex === -1 ? 'Cadastrar Novo Serviço' : 'Editar Serviço'}
                      </h2>
                      <p className="text-gray text-xs mt-1">Preencha os detalhes do procedimento</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingServiceIndex(null)}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <X size={20} className="text-gray" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Ícone Visual</label>
                      <select
                        value={serviceForm.icon}
                        onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                        className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                      >
                        <option value="○">Símbolo Redondo (○)</option>
                        <option value="◆">Símbolo Diamante (◆)</option>
                        <option value="◇">Símbolo Diamante Vazado (◇)</option>
                        <option value="✿">Flor (✿)</option>
                        <option value="★">Estrela (★)</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Nome do Serviço</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Design Premium"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Descrição</label>
                    <textarea
                      required
                      placeholder="Explique o que é o serviço, seus benefícios e o foco na beleza natural..."
                      rows={3}
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Valor (Preço)</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: R$ 30,00"
                        value={serviceForm.price}
                        onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                        className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Tempo/Durabilidade</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: 40 min ou 4-6 semanas"
                        value={serviceForm.duration}
                        onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                        className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Images block */}
                  <div className="border border-neutral-100 p-5 rounded-2xl bg-neutral-50/30">
                    <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-3">
                      Fotos do Portfólio (Carrossel da Galeria)
                    </label>
                    
                    <div className="flex gap-3 mb-4">
                      <input
                        type="text"
                        placeholder="Cole a URL de uma foto (Ex: /catalog/Design-premium.jpg)"
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        className="flex-grow py-2.5 px-4 rounded-xl border border-beige/60 bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={addImageUrl}
                        className="py-2.5 px-4 rounded-xl bg-dark text-white hover:bg-gray transition-colors text-sm font-semibold flex items-center gap-1.5"
                      >
                        <PlusCircle size={16} />
                        Adicionar
                      </button>
                    </div>

                    {/* Display current image URLs */}
                    {serviceForm.images && serviceForm.images.length > 0 ? (
                      <div className="space-y-2">
                        {serviceForm.images.map((url, uIdx) => (
                          <div
                            key={uIdx}
                            className="flex items-center justify-between gap-4 bg-white border border-neutral-200/80 rounded-xl p-2.5 text-xs text-gray font-medium"
                          >
                            <span className="truncate">{url}</span>
                            <button
                              type="button"
                              onClick={() => removeImageUrl(uIdx)}
                              className="p-1.5 text-gray hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray text-xs italic text-center py-4 bg-white border border-dashed border-neutral-200 rounded-xl">
                        Nenhuma imagem adicionada. Este serviço não aparecerá na galeria (apenas na lista de serviços).
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setEditingServiceIndex(null)}
                      className="py-3 px-6 rounded-xl border border-neutral-300 bg-white text-dark hover:bg-neutral-50 transition-colors font-semibold text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl bg-dark text-white hover:bg-gray transition-all shadow-md font-semibold text-sm flex items-center gap-2"
                    >
                      <Save size={16} />
                      Salvar Serviço
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Combos Tab */}
          {activeTab === 'combos' && (
            <form onSubmit={handleSaveCombos} className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl text-dark">Combos Especiais</h2>
                <p className="text-gray text-xs mt-1">Configure exatamente os 3 combos que serão exibidos no site</p>
              </div>
              <div className="w-full h-px bg-neutral-100" />

              <div className="space-y-8">
                {[0, 1, 2].map((comboIdx) => {
                  const combo = combos[comboIdx] || { name: `Combo ${comboIdx + 1}`, price: 'R$ 0,00', services: [], description: '' }
                  return (
                    <div
                      key={comboIdx}
                      className="border border-neutral-200/80 rounded-2xl p-6 bg-neutral-50/20"
                    >
                      <h3 className="font-display font-bold text-lg text-dark mb-4 pb-2 border-b border-neutral-100 flex items-center gap-2">
                        <Sparkles size={16} className="text-beige" />
                        Combo Especial {comboIdx + 1}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Nome do Combo</label>
                          <input
                            type="text"
                            required
                            placeholder={`Ex: Combo Sobrancelha ${comboIdx + 1}`}
                            value={combo.name}
                            onChange={(e) => handleComboChange(comboIdx, 'name', e.target.value)}
                            className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Preço Especial</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: R$ 150,00"
                            value={combo.price}
                            onChange={(e) => handleComboChange(comboIdx, 'price', e.target.value)}
                            className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Descrição Curta</label>
                        <input
                          type="text"
                          placeholder="Ex: Combinação ideal para economizar e valorizar o olhar"
                          value={combo.description || ''}
                          onChange={(e) => handleComboChange(comboIdx, 'description', e.target.value)}
                          className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-3">
                          Serviços Inclusos (Selecione até 4)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {services.map((service, sIdx) => {
                            const isChecked = (combo.services || []).includes(service.name)
                            return (
                              <button
                                type="button"
                                key={sIdx}
                                onClick={() => handleToggleServiceInCombo(comboIdx, service.name)}
                                className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                                  isChecked
                                    ? 'border-dark bg-dark/5 text-dark ring-1 ring-dark'
                                    : 'border-neutral-200 bg-white text-gray hover:bg-neutral-50 hover:border-neutral-300'
                                }`}
                              >
                                <span className="truncate pr-2">{service.name}</span>
                                {isChecked && <Check size={14} className="shrink-0 text-dark" />}
                              </button>
                            )
                          })}
                        </div>
                        <div className="mt-2.5 text-[10px] text-gray italic">
                          Selecionados: { (combo.services || []).length } de 4
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-xl bg-dark text-white hover:bg-gray transition-all shadow-md font-semibold text-sm flex items-center gap-2"
                >
                  <Save size={16} />
                  Salvar Todos os Combos
                </button>
              </div>
            </form>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <form onSubmit={handleSaveAddress} className="space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-dark">Localização & Endereço</h2>
                <p className="text-gray text-xs mt-1">Atualize as informações de endereço visíveis no site e mapa</p>
              </div>
              <div className="w-full h-px bg-neutral-100" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">CEP</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 39960-000"
                    maxLength={9}
                    value={address.cep}
                    onChange={handleCepChange}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Cidade</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jequitinhonha"
                    value={address.cidade}
                    onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Logradouro (Rua/Avenida)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Avenida Principal"
                    value={address.rua}
                    onChange={(e) => setAddress({ ...address, rua: e.target.value })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Número</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 123 ou S/N"
                    value={address.numero}
                    onChange={(e) => setAddress({ ...address, numero: e.target.value })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Bairro</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Centro"
                    value={address.bairro}
                    onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Estado (UF)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: MG"
                    maxLength={2}
                    value={address.estado}
                    onChange={(e) => setAddress({ ...address, estado: e.target.value.toUpperCase() })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm animate-uppercase"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-xl bg-dark text-white hover:bg-gray transition-all shadow-md font-semibold text-sm flex items-center gap-2"
                >
                  <Save size={16} />
                  Salvar Endereço
                </button>
              </div>
            </form>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-dark">Horários & Informações de Contato</h2>
                <p className="text-gray text-xs mt-1">Configure o WhatsApp, telefone de contato, email institucional e horários de atendimento</p>
              </div>
              <div className="w-full h-px bg-neutral-100" />

              <div>
                <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Slogan do Site</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Seja seu próprio padrão de beleza"
                  value={settings.slogan || ''}
                  onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                  className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                />
                <p className="text-[10px] text-gray mt-1.5">Slogan principal que será exibido no carrossel de abertura da página inicial.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Número de WhatsApp (Apenas Números)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 553195136154"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value.replace(/\D/g, '') })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                  <p className="text-[10px] text-gray mt-1.5">Insira o código do país + DDD + número (ex: 553195136154). Utilizado para gerar os links de agendamento.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Telefone de Exibição</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: (31) 99513-6154"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                  <p className="text-[10px] text-gray mt-1.5">Telefone formatado que será exibido textualmente no site.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Caixa de E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="Ex: contato@pollynne.com.br"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Dias de Atendimento</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Terça a Sábado"
                    value={settings.days}
                    onChange={(e) => setSettings({ ...settings, days: e.target.value })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">Horário de Atendimento</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 09h às 19h"
                    value={settings.hours}
                    onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                    className="w-full py-3 px-4 rounded-xl border border-beige/60 bg-neutral-50/50 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-xl bg-dark text-white hover:bg-gray transition-all shadow-md font-semibold text-sm flex items-center gap-2"
                >
                  <Save size={16} />
                  Salvar Informações
                </button>
              </div>
            </form>
          )}
        </main>
      </div>

      {/* Global Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-2xl flex items-center gap-3 shadow-xl border animate-slide-in ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'
        }`}>
          {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  )
}
