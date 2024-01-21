import { RefObject, useEffect, useRef } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
	eventName: K,
	handler: (event: WindowEventMap[K]) => void,
	element?: undefined,
	options?: boolean | AddEventListenerOptions
): void

function useEventListener<KW extends keyof WindowEventMap>(
	eventName: KW,
	handler: (event: WindowEventMap[KW] | Event) => void,
	element?: RefObject<T>,
	options?: boolean | AddEventListenerOptions
) {
	// Create a ref that stores handler
	const savedHandler = useRef(handler)

	useIsomorphicLayoutEffect(() => {
		savedHandler.current = handler
	}, [handler])

	useEffect(() => {
		// Define the listening target
		const targetElement: T | Window = element?.current ?? window

		if (!targetElement?.addEventListener) return

		// Create event listener that calls handler function stored in ref
		const listener: typeof handler = (event) => savedHandler.current(event)

		targetElement.addEventListener(eventName, listener, options)

		// Remove event listener on cleanup
		return () => {
			targetElement.removeEventListener(eventName, listener, options)
		}
	}, [eventName, element, options])
}

export { useEventListener }
