import '@/styles/globals.css'

import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { getDictionary } from '@/get-dictionary'
import { Locale, i18n } from '@/i18n-config'
import { Metadata, Viewport } from 'next'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans'
})

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({
	params: { lang }
}: {
	params: { lang: Locale }
}): Promise<Metadata> {
	const dictionary = await getDictionary(lang)

	return {
		title: dictionary.title,
		description: dictionary.description,
		icons: {
			icon: [
				{ url: '/icon.svg', type: 'image/svg+xml' },
				{ url: '/icon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
				{ url: '/icon-32x32.png', type: 'image/png', sizes: '32x32' },
				{ url: '/icon-16x16.png', type: 'image/png', sizes: '16x16' }
			],
			apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
		},
		other: {
			rel: 'mask-icon',
			href: '/safari-pinned-tab.svg',
			color: '#facc15'
		},
		manifest: '/manifest.webmanifest'
	}
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' }
	]
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
