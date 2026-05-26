import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const adminUser = process.env.ADMIN_USER || 'pollynne'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Ap240397'

    if (username === adminUser && password === adminPassword) {
      const cookieStore = await cookies()
      cookieStore.set('admin_session', 'authenticated_session_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: 'Usuário ou senha incorretos' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro interno do servidor' }, { status: 500 })
  }
}
