export type DiscordSearch = {
	hits: Hit[]
	nbHits: number
	offset: number
	length: number
	exhaustiveNbHits: boolean
	exhaustiveTypo: boolean
	exhaustive: Exhaustive
	query: Query
	params: string
	processingTimeMS: number
	processingTimingsMS: ProcessingTimingsMS
	serverTimeMS: number
	aggregateFacets: AggregateFacets
	totalNbHits: number
}

export type AggregateFacets = {
	'categories.id': { [key: string]: number }
}

export type Exhaustive = {
	nbHits: boolean
	typo: boolean
}

export type Hit = {
	id: string
	name: string
	description: string
	icon: string
	splash: string
	banner: string
	approximate_presence_count: number
	approximate_member_count: number
	premium_subscription_count: number
	preferred_locale: PreferredLocale
	auto_removed: boolean
	discovery_splash: string
	primary_category_id: number
	vanity_url_code: string
	is_published: boolean
	keywords: string[]
	features: Feature[]
	categories: HitPrimaryCategory[]
	primary_category: HitPrimaryCategory
	objectID: string
	_highlightResult: HighlightResult
}

export type HighlightResult = {
	name: Description
	description: Description
	vanity_url_code: Description
	keywords: Description[]
	categories: HighlightResultPrimaryCategory[]
	primary_category: HighlightResultPrimaryCategory
}

export type HighlightResultPrimaryCategory = {
	name_localizations: { [key: string]: Description }
}

export type Description = {
	value: string
	matchLevel: MatchLevel
	matchedWords: Query[]
	fullyHighlighted?: boolean
}

export enum MatchLevel {
	Full = 'full',
	None = 'none',
}

export enum Query {
	Balle = 'balle',
}

export type HitPrimaryCategory = {
	id: number
	is_primary: boolean
	name: string
	name_localizations: NameLocalizations
}

export type NameLocalizations = {
	bg?: string
	cs?: string
	da?: string
	de: string
	el?: string
	fi?: string
	fr: string
	hi?: string
	hr?: string
	hu?: string
	it?: string
	ja?: string
	ko?: string
	lt?: string
	nl?: string
	no?: string
	pl?: string
	ro?: string
	ru: string
	th?: string
	tr?: string
	uk?: string
	vi?: string
	'en-GB'?: string
	'en-US'?: string
	'es-ES'?: string
	'pt-BR'?: string
	'sv-SE'?: string
	'zh-CN'?: string
	'zh-TW'?: string
}

export enum Feature {
	Community = 'COMMUNITY',
	Discoverable = 'DISCOVERABLE',
	EnabledDiscoverableBefore = 'ENABLED_DISCOVERABLE_BEFORE',
	Featurable = 'FEATURABLE',
	MemberVerificationGateEnabled = 'MEMBER_VERIFICATION_GATE_ENABLED',
	PreviewEnabled = 'PREVIEW_ENABLED',
	Verified = 'VERIFIED',
	WelcomeScreenEnabled = 'WELCOME_SCREEN_ENABLED',
}

export enum PreferredLocale {
	De = 'de',
	EnUS = 'en-US',
	PtBR = 'pt-BR',
}

export type ProcessingTimingsMS = {
	afterFetch: AfterFetch
	fetch: Fetch
	request: Request
	total: number
}

export type AfterFetch = {
	format: Format
	total: number
}

export type Format = {
	highlighting: number
	total: number
}

export type Fetch = {
	total: number
}

export type Request = {
	roundTrip: number
}
