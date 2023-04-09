export function formatQuantity(number: number) {
	return Intl.NumberFormat('en', { notation: 'compact' }).format(number)
}

export function debounce(fn: () => void, delay: number) {
	let timeout: NodeJS.Timeout

	return () => {
		clearTimeout(timeout)
		timeout = setTimeout(() => fn(), delay)
	}
}
