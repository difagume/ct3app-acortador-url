import { TINY_SUBDOMAIN } from '@/app/[lang]/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Url } from '@prisma/client'
import { CheckIcon, CopyIcon, ExternalLinkIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const URL_DOMAIN = isBrowser ? `${window.location.origin}/${TINY_SUBDOMAIN}` : ''

interface Props {
	url: Omit<Url, 'createdAt' | 'updatedAt' | 'createdById'>
	handleDelete: (urlId: number) => void
}
export default function CardUrl({ url, handleDelete }: Props) {
	const [hasCopied, setHasCopied] = useState(false)

	function handleCopy(url: Omit<Url, 'createdAt' | 'updatedAt' | 'createdById'>) {
		setHasCopied(true)
		navigator.clipboard.writeText(`${URL_DOMAIN}/${url.shortUrl}`)
		setTimeout(() => {
			setHasCopied(false)
		}, 1000)
	}

	return (
		<Card className="m-3 w-full max-w-md flex-shrink-0 animate-in fade-in-25 duration-300">
			<CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
				{/* <CardTitle className="text-sm font-medium">{url.shortUrl}</CardTitle> */}
				<div className="absolute top-6 right-6 flex flex-col space-y-2">
					<Button variant="ghost" size="icon" className="size-4 hover:bg-clear" onClick={() => handleCopy(url)}>
						{hasCopied ? (
							<CheckIcon className="size-5" />
						) : (
							<CopyIcon className="size-4 text-muted-foreground hover:text-current" />
						)}
					</Button>
					<Button variant="ghost" size="icon" className="size-4 hover:bg-clear" onClick={() => handleDelete(url.id)}>
						<TrashIcon className="size-4 text-muted-foreground hover:text-current" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="grid justify-items-start overflow-hidden mr-4">
				<Link
					className="flex items-center gap-2 text-2xl font-bold"
					href={`/${TINY_SUBDOMAIN}/${url.shortUrl}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{`${TINY_SUBDOMAIN}/${url.shortUrl}`}
					<ExternalLinkIcon className="text-muted-foreground" />
				</Link>
				<p className="text-xs text-muted-foreground text-left truncate max-w-full pointer-events-none">{url.url}</p>
			</CardContent>
		</Card>
	)
}
