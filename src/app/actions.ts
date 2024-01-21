'use server'

import { db } from '@/server/db'
import { Url } from '@prisma/client'
import { customAlphabet } from 'nanoid'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export async function shortUrl(url: string): Promise<Url | undefined> {
	const nanoid = customAlphabet(alphabet, 5)
	let shortUrl = nanoid()

	const newUrl = !url.startsWith('http://') && !url.startsWith('https://') ? `https://${url}` : url

	async function createUrl() {
		try {
			return await db.url.create({
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

	const data = await createUrl()

	return data
}
