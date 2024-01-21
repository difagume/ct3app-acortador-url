'use client'

import { shortUrl } from '@/app/actions'
import { MenuButtons } from '@/components/menu-buttons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Url } from '@prisma/client'
import { CheckIcon, CopyIcon, EraserIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import QrCreator from 'qr-creator-ssr'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export default function ShortUrl() {
	const { resolvedTheme } = useTheme()
	const [urls, setUrls] = useLocalStorage<Omit<Url, 'createdAt' | 'updatedAt' | 'createdById'>[]>('urls', [])
	const [txtUrl, setTxtUrl] = useState<string>('')
	const [link, setLink] = useState<Url>()
	const [hasCopied, setHasCopied] = useState(false)
	const ref = useRef<HTMLCanvasElement | null>(null)

	const themeColors: QrCreator.ColorStop[] = useMemo(() => {
		return resolvedTheme === 'dark'
			? [
					[0, '#facc15'],
					[0.65, '#ffdb6d'],
					[1, '#ffe598']
			  ]
			: [
					[0, '#000000'],
					[0.5, '#474747'],
					[1, '#5c5c5c']
			  ]
	}, [resolvedTheme])

	const generaQr = useCallback(
		(text: string) => {
			if (ref.current) {
				QrCreator.render(
					{
						text,
						radius: 0.5,
						ecLevel: 'H',
						fill: {
							type: 'linear-gradient',
							position: [0, 0, 1, 1],
							colorStops: themeColors
						},
						background: null,
						size: 128
					},
					ref.current
				)
			}
		},
		[themeColors]
	)

	useEffect(() => {
		if (link) {
			generaQr(window.location.href + link.shortUrl)
		}
	}, [link, generaQr])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			if (txtUrl) {
				const link = await shortUrl(txtUrl)
				setLink(link)

				// localstorage
				if (link) {
					setTxtUrl('')
					const {
						createdAt,
						updatedAt,
						// createdById,
						...rest
					} = link
					const updatedUrls = [rest, ...urls]
					setUrls(updatedUrls)
				}
			}
		},
		[txtUrl]
	)

	const handleCopy = useCallback(() => {
		if (!hasCopied && link) {
			setHasCopied(true)
			navigator.clipboard.writeText(window.location.href + link.shortUrl)
			setTimeout(() => {
				setHasCopied(false)
			}, 2000)
		}
	}, [hasCopied, link])

	const handleClear = useCallback(() => {
		setTxtUrl('')
		setLink(undefined)
		const inputElement = document.getElementById('txtUrl')
		if (inputElement instanceof HTMLInputElement) {
			inputElement.focus()
		}
	}, [])

	return (
		<>
			<div className="border-b">
				<div className="flex h-14 items-center">
					<div className="ml-auto flex">
						<MenuButtons />
					</div>
				</div>
			</div>
			<div className="px-0 container max-w-xl pt-10 sm:pt-10">
				<div className="grid grid-cols-1 items-center justify-between space-y-5">
					<h2 className="text-3xl md:text-5xl font-extrabold tracking-tight m-auto">Acortador de URL</h2>
					<Card className="relative">
						<div
							aria-hidden="true"
							className="absolute right-7 top-0 z-10 h-px w-48"
							style={{
								background:
									'linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)'
							}}
						/>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<div className="pt-6 grid gap-4">
									<div className="flex flex-col space-y-3">
										<Label htmlFor="url">Ingresa el URL</Label>
										<div className="flex gap-2">
											<Input
												id="txtUrl"
												autoFocus
												required
												placeholder="url"
												value={txtUrl}
												onChange={(e) => setTxtUrl(e.target.value)}
											/>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														className="shrink-0"
														variant="outline"
														size="icon"
														type="button"
														onClick={handleClear}
														disabled={txtUrl === '' && !link}
													>
														<EraserIcon />
													</Button>
												</TooltipTrigger>
												<TooltipContent>
													<p>Limpiar</p>
												</TooltipContent>
											</Tooltip>
										</div>
									</div>
									<Button className="w-full">Acortar</Button>
								</div>
							</form>
						</CardContent>
						{link && (
							<CardFooter className="grid">
								<Separator id="sss" className="mt-2 mb-4 sm:mb-6" />
								<div className="flex flex-col sm:flex-row justify-around space-y-4 sm:space-y-0">
									{/* <div className="flex flex-col justify-center items-center pb-3 sm:pb-0"> */}
									<div className="flex justify-center items-center gap-2">
										<ExternalLinkIcon className="text-muted-foreground" />
										<Link
											className="text-sm sm:text-base"
											target="_blank"
											rel="noopener noreferrer"
											href={`/${link.shortUrl}`}
										>
											{`${window.location.host}/${link.shortUrl}`}
										</Link>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button variant="outline" size="icon" type="button" onClick={handleCopy}>
													{hasCopied ? <CheckIcon className="size-5" /> : <CopyIcon />}
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Copiar</p>
											</TooltipContent>
										</Tooltip>
									</div>
									{/* <CheckIcon
											className={cn('size-7 text-green-500 animate-pulse', hasCopied ? 'visible' : 'invisible')}
										/> */}
									{/* </div> */}
									<canvas className="max-w-32 m-auto sm:m-0" ref={ref} />
								</div>
							</CardFooter>
						)}
						<div
							aria-hidden="true"
							className="absolute bottom-0 left-1 z-10 h-px w-48"
							style={{
								background:
									'linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.4) 64.41%, rgba(236, 72, 153, 0) 98.93%)'
							}}
						/>
					</Card>
				</div>
			</div>
		</>
	)
}
