import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  getServices,
  saveServices,
  getCombos,
  saveCombos,
  getAddress,
  saveAddress,
  getSettings,
  saveSettings,
  getHeroPhotos,
  saveHeroPhotos
} from '@/lib/db'

export const dynamic = 'force-dynamic'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return !!session && session.value === 'authenticated_session_token'
}

export async function GET() {
  try {
    const services = await getServices()
    const combos = await getCombos()
    const address = await getAddress()
    const settings = await getSettings()
    const heroPhotos = await getHeroPhotos()

    return NextResponse.json({ services, combos, address, settings, heroPhotos })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao carregar os dados' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { type, data } = await request.json()

    if (type === 'services') {
      await saveServices(data)
      return NextResponse.json({ success: true })
    } else if (type === 'combos') {
      await saveCombos(data)
      return NextResponse.json({ success: true })
    } else if (type === 'address') {
      await saveAddress(data)
      return NextResponse.json({ success: true })
    } else if (type === 'settings') {
      await saveSettings(data.settings)
      if (data.heroPhotos) await saveHeroPhotos(data.heroPhotos)
      return NextResponse.json({ success: true })
    } else if (type === 'hero') {
      await saveHeroPhotos(data.heroPhotos)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Tipo de dados inválido' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar os dados' }, { status: 500 })
  }
}
