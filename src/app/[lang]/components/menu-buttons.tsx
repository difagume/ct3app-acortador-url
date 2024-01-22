import { Button } from '@/components/ui/button'
import { getDictionary } from '@/get-dictionary'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'

export function MenuButtons({
	dictionary
}: {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
}) {
	return (
		<>
			{/* <Tooltip>
				<TooltipTrigger asChild>
					<Button variant="ghost" size="icon">
						<HeartIcon className="" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Mis links</p>
				</TooltipContent>
			</Tooltip> */}
			<Button asChild variant="ghost" size="icon">
				<Link href="https://github.com/difagume/ct3app-acortador-url" target="_blank" rel="noopener noreferrer">
					<GitHubLogoIcon />
				</Link>
			</Button>
			<ModeToggle dictionary={dictionary} />
		</>
	)
}
