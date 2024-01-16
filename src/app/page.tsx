'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { CheckIcon, CopyIcon, EraserIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import Link from 'next/link'
import QrCreator from 'qr-creator-ssr'
import { useEffect, useRef, useState } from 'react'
import { shortUrl } from './actions'

export default function HomePage() {
	const [txtUrl, setTxtUrl] = useState<string>('')
	const [shortUrlString, setShortUrlString] = useState<string>('')
	const [showCheckIcon, setShowCheckIcon] = useState(false)
	const ref = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		if (shortUrlString) {
			function generaQr(text: string) {
				if (ref.current) {
					QrCreator.render(
						{
							text,
							radius: 0.5,
							ecLevel: 'H',
							fill: {
								type: 'linear-gradient',
								position: [0, 0, 1, 1],
								colorStops: [
									[0, '#facc15'],
									[0.65, '#ffdb6d'],
									[1, '#ffe598']
								]
							},
							background: null,
							size: 128
						},
						ref.current
					)
				}
			}

			generaQr(window.location.href + shortUrlString)
		}
	}, [shortUrlString])
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (txtUrl) {
			const link = await shortUrl(txtUrl)
			setShortUrlString(link)
		}
	}

	function handleCopy() {
		setShowCheckIcon(true)
		navigator.clipboard.writeText(window.location.href + shortUrlString)

		setTimeout(() => {
			setShowCheckIcon(false)
		}, 1100)
	}

	function handleClear() {
		setTxtUrl('')
		setShortUrlString('')
	}

	return (
		<>
			<h1 className="text-3xl md:text-4xl pt-16 font-extrabold tracking-tight m-auto">Acortador de URL</h1>
			<Card className="relative">
				<div
					aria-hidden="true"
					className="absolute right-7 top-0 z-10 h-px w-48"
					// bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
					style={{
						background:
							'linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)'
					}}
					data-darkreader-inline-bgimage=""
					data-darkreader-inline-bgcolor=""
				/>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="pt-6 grid w-full items-center gap-4">
							<div className="flex flex-col space-y-2">
								<Label htmlFor="url">Ingresa el URL</Label>
								<div className="flex gap-2">
									<Input
										autoFocus
										required
										placeholder="url"
										value={txtUrl}
										onChange={(e) => setTxtUrl(e.target.value)}
									/>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													className="shrink-0"
													variant="outline"
													size="icon"
													type="button"
													onClick={handleClear}
													disabled={txtUrl === '' && shortUrlString === ''}
												>
													<EraserIcon />
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Limpiar</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
							<Button className="w-full">Acortar</Button>
						</div>
					</form>
				</CardContent>
				{shortUrlString && (
					<CardFooter className="grid">
						<Separator className="mt-3 mb-6" />
						<div className="flex flex-col sm:flex-row justify-around">
							<div className="flex flex-col justify-center items-center pb-3 sm:pb-0">
								<div className="flex items-center gap-2">
									<ExternalLinkIcon />
									<Link
										className="text-sm sm:text-base"
										target="_blank"
										rel="noopener noreferrer"
										href={`/${shortUrlString}`}
									>
										{`${window.location.host}/${shortUrlString}`}
									</Link>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button variant="outline" size="icon" type="button" onClick={handleCopy}>
													<CopyIcon />
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Copiar</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<CheckIcon
									className={cn('size-7 text-green-500 animate-pulse', showCheckIcon ? 'visible' : 'invisible')}
								/>
							</div>
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
		</>
	)
}
