'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getDictionary } from '@/get-dictionary'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export function ModeToggle({
	dictionary
}: {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
}) {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<SunIcon className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Cambiar tema</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>{dictionary.light}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>{dictionary.dark}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>{dictionary.system}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
