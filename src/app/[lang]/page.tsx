import ShortUrl from '@/app/[lang]/components/short-url'
import { TooltipProvider } from '@/components/ui/tooltip'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import dynamic from 'next/dynamic'

const MyLinks = dynamic(() => import('@/app/[lang]/components/my-links'), { ssr: false })

export default async function Home({
	params: { lang }
}: {
	params: { lang: Locale }
}) {
	const dictionary = await getDictionary(lang)

	return (
		<TooltipProvider>
			<ShortUrl dictionary={dictionary} />
			<MyLinks dictionary={dictionary} />
		</TooltipProvider>
	)
}
