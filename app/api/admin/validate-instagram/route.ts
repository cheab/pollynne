import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return !!session && session.value === 'authenticated_session_token'
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { accessToken, businessAccountId } = await request.json()

    if (!accessToken || !businessAccountId) {
      return NextResponse.json(
        { error: 'Token de acesso e Business Account ID são obrigatórios' },
        { status: 400 }
      )
    }

    // Call the Instagram Graph API
    const url = `https://graph.facebook.com/v19.0/${businessAccountId}/media?fields=id,media_type,media_url,permalink,caption,timestamp&limit=6&access_token=${accessToken}`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      next: { revalidate: 0 } // bypass cache for testing
    })

    if (!res.ok) {
      const errData = await res.json()
      console.error('Instagram API Validation Failed:', errData)
      return NextResponse.json(
        {
          error:
            errData.error?.message ||
            'Não foi possível conectar ao Instagram. Verifique as credenciais.'
        },
        { status: 400 }
      )
    }

    const data = await res.json()
    return NextResponse.json({
      success: true,
      media: data.data || []
    })
  } catch (error) {
    console.error('Validation Error:', error)
    return NextResponse.json(
      { error: 'Erro de conexão com o servidor da API do Instagram' },
      { status: 500 }
    )
  }
}
