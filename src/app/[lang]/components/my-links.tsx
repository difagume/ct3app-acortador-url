'use client'

import CardUrl from '@/app/[lang]/components/card-url'
import { useToast } from '@/components/ui/use-toast'
import { getDictionary } from '@/get-dictionary'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Url } from '@prisma/client'

export default function MyLinks({
	dictionary
}: {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
}) {
	const { toast } = useToast()
	const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
	const [urls, setUrls] = useLocalStorage<Omit<Url, 'createdAt' | 'updatedAt' | 'createdById'>[]>('urls', [])

	if (urls?.length === 0) return

	function handleDelete(urlId: number) {
		setUrls(urls.filter((url) => url.id !== urlId))
		toast({
			description: dictionary.linkDeleted
		})
	}
	/* < className="pt-4 sm:pt-8 sm:mx-2 grid gap-4 md:grid-cols-2 lg:grid-cols-4"> */
	{
		/* <div className="pt-4 sm:pt-8 sm:mx-2 grid gap-4 justify-center"
			style={{ gridTemplateColumns: 'repeat(auto-fit, max(330px))' }}> */
	}
	return (
		<div className="pt-8 text-center">
			<h3 className="text-3xl md:text-3xl font-extrabold tracking-tight m-auto">{dictionary.myLinks} </h3>
			<div className="flex flex-wrap items-center justify-center" ref={parent}>
				{urls.map((url) => (
					<CardUrl key={url.id} url={url} handleDelete={handleDelete} />
				))}
			</div>
		</div>
	)
}
