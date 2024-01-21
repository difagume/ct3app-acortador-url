import ShortUrl from '@/components/short-url'
import { TooltipProvider } from '@/components/ui/tooltip'
import dynamic from 'next/dynamic'

const MyLinks = dynamic(() => import('@/components/my-links'), { ssr: false })

export default async function Home() {
	return (
		<TooltipProvider>
			<ShortUrl />
			<MyLinks />
		</TooltipProvider>
	)
}
