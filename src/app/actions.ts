'use server'

import { db } from '@/server/db'
import { customAlphabet } from 'nanoid'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export async function shortUrl(url: string) {
	const nanoid = customAlphabet(alphabet, 5)
	let shortUrl = nanoid()

	const newUrl = !url.startsWith('http://') && !url.startsWith('https://') ? `https://${url}` : url

	async function createUrl() {
		try {
			await db.url.create({
				data: {
					url: newUrl,
					shortUrl
				}
			})
		} catch (e) {
			shortUrl = nanoid()
			await createUrl()
		}
	}

	await createUrl()

	return shortUrl
}
