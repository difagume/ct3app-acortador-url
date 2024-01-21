import '@/styles/globals.css'

import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'
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
		{ rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
		{ rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
		{ rel: "apple-touch-icon", type: "image/png", sizes: "180x180", url: "/apple-touch-icon.png" },
	],
	manifest: '/manifest.webmanifest'
}

export const viewport: Viewport = {
	themeColor: 'white',
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="es" suppressHydrationWarning>
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
