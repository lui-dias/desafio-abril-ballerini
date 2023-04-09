import { ui, defaultLang } from './i18n/ui'

export function formatQuantity(number: number) {
	return Intl.NumberFormat('en', { notation: 'compact' }).format(number)
}

export function debounce(fn: () => void, delay: number) {
	let timeout: NodeJS.Timeout

	return () => {
		clearTimeout(timeout)
		timeout = setTimeout(fn, delay)
	}
}

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/')
	if (lang in ui) return lang as keyof typeof ui
	return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key]
	}
}
