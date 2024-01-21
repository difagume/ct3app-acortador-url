import { ModeToggle } from './mode-toggle'

export function MenuButtons() {
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
			<ModeToggle />
		</>
	)
}
