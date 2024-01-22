import '@/styles/globals.css'

import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Locale, i18n } from '@/i18n-config'
import { Viewport } from 'next'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans'
})

export const metadata = {
	title: 'Acortador de URL',
	description: 'Generador de URLs cortas',
	icons: [
		{ rel: 'icon', type: 'image/svg+xml', url: '/trim.svg' },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
		{ rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', url: '/apple-touch-icon.png' }
	],
	manifest: '/manifest.webmanifest'
}

export const viewport: Viewport = {
	themeColor: 'white'
}

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: { lang: Locale }
}) {
	return (
		<html lang={params.lang} suppressHydrationWarning>
			<head>
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#facc15" />
				<meta name="msapplication-TileColor" content="#facc15" />
			</head>
			<body
				className={`px-4 grid gap-4 grid-rows-[auto,1fr,auto] bg-background antialiased font-sans ${inter.variable}`}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
