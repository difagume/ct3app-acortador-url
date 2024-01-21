import '@/styles/globals.css'

import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans'
})

export const metadata = {
	title: 'Acortador de URL',
	description: 'Generador de URLs cortas',
	icons: [{ rel: 'icon', url: '/trim.svg' }]
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
