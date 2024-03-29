import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { i18n } from './i18n-config'

function getLocale(request: NextRequest): string | undefined {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {}
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales
	// Use negotiator and intl-localematcher to get best locale
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
	const locale = matchLocale(languages, locales, i18n.defaultLocale)

	return locale
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname
	// `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
	// If you have one
	if (
		[
			'/s/screencapture-desktop_1.png',
			'/s/screencapture-desktop_2.png',
			'/s/screencapture-mobil_1.png',
			'/s/screencapture-mobil_2.png',
			'/android-chrome-192x192.png',
			'/android-chrome-512x512.png',
			'/apple-touch-icon-precomposed.png',
			'/apple-touch-icon.png',
			'/browserconfig.xml',
			'/icon-16x16.png',
			'/icon-32x32.png',
			'/favicon.ico',
			'/manifest.webmanifest',
			'/maskable_icon_x192.png',
			'/safari-pinned-tab.svg',
			'/icon-dark.svg',
			'/icon.svg'
			// Your other files in `public`
		].includes(pathname)
	)
		return

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request)
		// e.g. incoming request is /products
		// The new URL is now /en-US/products
		return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url))
	}
}

export const config = {
	// Matcher ignoring `/_next/`, `/api/` and `/t/`
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|t).*)']
}
