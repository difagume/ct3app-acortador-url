'use client'

import CardUrl from '@/components/ui/card-url'
import { useToast } from '@/components/ui/use-toast'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Url } from '@prisma/client'

export default function MyLinks() {
	const { toast } = useToast()
	const [urls, setUrls] = useLocalStorage<Omit<Url, 'createdAt' | 'updatedAt' | 'createdById'>[]>('urls', [])

	if (!urls) return

	function handleDelete(urlId: number) {
		setUrls(urls.filter((url) => url.id !== urlId))
		toast({
			description: 'Link eliminado'
		})
	}
	/* < className="pt-4 sm:pt-8 sm:mx-2 grid gap-4 md:grid-cols-2 lg:grid-cols-4"> */
	{
		/* <div className="pt-4 sm:pt-8 sm:mx-2 grid gap-4 justify-center"
			style={{ gridTemplateColumns: 'repeat(auto-fit, max(330px))' }}> */
	}
	return (
		<div className="pt-8 text-center">
			<h3 className="text-3xl md:text-3xl font-extrabold tracking-tight m-auto">Mis links</h3>
			<div className="flex flex-wrap items-center justify-center">
				{urls.map((url) => (
					<CardUrl key={url.id} url={url} handleDelete={handleDelete} />
				))}
			</div>
		</div>
	)
}
