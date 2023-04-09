<script lang="ts">
	import type { Community, DiscordSearch } from '../types'
	import { debounce, formatQuantity, getLangFromUrl, useTranslations } from '../utils'
	import Header from './Header.svelte'
	import Skeleton from './Skeleton.svelte'
	import Search from './icons/Search.svelte'

	export let url: URL
	let theme = localStorage.getItem('theme') || 'dark'
	let value = ''
	let input: HTMLInputElement
	let communities = [] as Community[]
	let isLoading = false
	let debouncedGetCommunities = debounce(getCommunities, 500)

	const lang = getLangFromUrl(url)
	const t = useTranslations(lang)

	$: {
		localStorage.setItem('theme', theme)

		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
			document.documentElement.classList.remove('light')
		} else {
			document.documentElement.classList.remove('dark')
			document.documentElement.classList.add('light')
		}
	}

	async function getCommunities() {
		if (!value) {
			communities = []
			return
		}

		const response = await fetch(
			`https://discord.com/api//discovery/search?query=${value}&limit=12`,
		)
		const data = (await response.json()) as DiscordSearch

		communities = data.hits.map(c => ({
			icon: `https://cdn.discordapp.com/icons/${c.id}/${c.icon}.${
				c.icon.startsWith('a_') ? 'gif' : 'png'
			}`,
			name: c.name,
			members: c.approximate_member_count,
			link: `https://discord.gg/${c.vanity_url_code}`,
		}))

		isLoading = false
	}
</script>

<svelte:window
	on:keydown={e => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
			e.preventDefault()

			input.focus()
		}

		if (e.key === 'Escape') {
			input.blur()
		}
	}}
/>

<div class="max-w-7xl mx-auto relative">
	<Header {lang} {theme} {t} />

	<main
		class="min-h-screen flex flex-col items-center justify-center gap-y-10 w-[95%] mx-auto md:w-full"
	>
		<img src="/writting-emoji.webp" alt="Writting emoji" class="w-16 h-16" />

		<div class="flex flex-col items-center gap-y-2">
			<h1 class="text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">{t('title')}</h1>
			<span class="text-zinc-500 dark:text-zinc-400 text-2xl text-center"
				>{t('subtitle')}</span
			>
		</div>

		<form
			class="rounded-lg bg-zinc-300 dark:bg-zinc-800 max-w-[560px] w-full"
			on:submit={e => {
				e.preventDefault()
				input.blur()
			}}
		>
			<label
				for="search"
				class="relative px-6 bg-zinc-300 dark:bg-zinc-800 flex gap-x-3 items-center h-[55px] rounded-lg"
			>
				<Search />
				<input
					type="text"
					id="search"
					placeholder={t('search')}
					class="absolute left-0 pl-12 pr-4 text-zinc-700 dark:text-zinc-400 placeholder:text-zinc-600 font-medium bg-transparent w-full h-full rounded-lg outline-none focus:outline-zinc-400"
					bind:value
					bind:this={input}
					on:input={() => {
						isLoading = true
						debouncedGetCommunities()
					}}
					spellcheck="false"
					autocomplete="off"
				/>
			</label>
			{#if value}
				<ul
					class="flex flex-col py-4 max-h-[calc(48px*4+16px*3+32px)] overflow-y-auto scrollbar-thin dark:scrollbar-thumb-zinc-600 dark:scrollbar-track-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 relative before:absolute before:top-0 before:left-0 before:w-[calc(100%-32px)] before:h-px before:bg-zinc-400 dark:before:bg-zinc-700 before:mx-4"
				>
					{#if isLoading}
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
					{:else if communities.length === 0}
						<li class="flex justify-center items-center py-2">
							<span class="text-zinc-400">{t('notFound')}</span>
						</li>
					{:else}
						{#each communities as c}
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<li
								tabindex="0"
								class="flex justify-between items-center py-2 px-6 focus:bg-zinc-700 outline-none"
							>
								<div tabindex="-1" class="flex items-center">
									<img src={c.icon} alt={c.name} class="w-10 h-10 rounded-lg" />
									<div class="flex flex-col ml-4">
										<strong
											class="font-medium text-zinc-700 dark:text-zinc-200 text-xl mr-3"
											>{c.name}</strong
										>
										<span class="text-sm text-zinc-500 dark:text-zinc-400"
											>{formatQuantity(c.members)} {t('members')}</span
										>
									</div>
								</div>
								<a
									href={c.link}
									target="_blank"
									tabindex="-1"
									class="border border-zinc-500 dark:border-zinc-600 rounded px-2 py-1 text-zinc-700 dark:text-zinc-400 bg-zinc-400 dark:bg-zinc-700 leading-4 transition-colors hover:bg-orange-500 hover:text-zinc-100"
									>{t('join')}</a
								>
							</li>
						{/each}
					{/if}
				</ul>
			{/if}
		</form>
	</main>
</div>
