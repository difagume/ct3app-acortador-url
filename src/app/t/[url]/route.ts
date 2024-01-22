import { db } from '@/server/db'
import { redirect } from 'next/navigation'

export async function GET(req: Request, { params }: { params: { url: string } }) {
	const url = params.url
	const link = await db.url.findUnique({
		where: {
			shortUrl: url
		}
	})

	link ? redirect(link.url) : redirect('/')
}
