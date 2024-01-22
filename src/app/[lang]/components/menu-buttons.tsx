import { getDictionary } from '@/get-dictionary'
import { ModeToggle } from './mode-toggle'

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
			<ModeToggle dictionary={dictionary} />
		</>
	)
}
