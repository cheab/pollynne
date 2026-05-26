import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return !!session && session.value === 'authenticated_session_token'
}

export async function GET() {
  const auth = await isAuthenticated()
  if (auth) {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false, error: 'Não autorizado' }, { status: 401 })
}
