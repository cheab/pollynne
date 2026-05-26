import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

export const metadata: Metadata = {
  title: 'Pollynne Leite Beauty - Especialista em Beleza Natural',
  description: 'Serviços premium de beleza natural. Design de sobrancelhas, microblading, lash lifting e muito mais.',
  openGraph: {
    title: 'Pollynne Leite Beauty',
    description: 'Especialista em tratamentos de beleza natural',
    url: 'https://pollynne.com.br',
    siteName: 'Pollynne Leite Beauty',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-beige-light text-dark font-body">{children}<SpeedInsights /></body>
    </html>
  )
}
