<script lang="ts">
	import type { DiscordSearch } from '../types'
	import Search from './icons/Search.svelte'

	type Community = {
		icon: string
		name: string
		members: number
		link: string
	}

	function formatQuantity(number: number) {
		return Intl.NumberFormat('en', { notation: 'compact' }).format(number)
	}

	function debounce(fn: () => void, delay: number) {
		let timeout: NodeJS.Timeout

		return function () {
			clearTimeout(timeout)
			timeout = setTimeout(() => fn(), delay)
		}
	}

	let value = ''
	let communities = [] as Community[]

	async function getCommunities() {
		const response = await fetch(
			`https://discord.com/api//discovery/search?query=${value}&limit=12`,
		)
		const data = (await response.json()) as DiscordSearch

		communities = data.hits.map(c => ({
			icon: `https://cdn.discordapp.com/icons/${c.id}/${c.icon}.png`,
			name: c.name,
			members: c.approximate_member_count,
			link: `https://discord.gg/${c.vanity_url_code}`,
		}))
	}
</script>

<main class="min-h-screen flex flex-col items-center justify-center gap-y-10">
	<img src="/writting-emoji.webp" alt="Writting emoji" />

	<div class="flex flex-col items-center gap-y-2">
		<h1 class="text-zinc-100 font-semibold text-3xl">Faça algo mágico...</h1>
		<span class="text-zinc-400 text-2xl">Ache sempre tudo em um só lugar!</span>
	</div>

	<form class="px-6 rounded-lg bg-zinc-800 max-w-[560px] w-full">
		<label for="search" class="bg-zinc-800 flex gap-x-3 items-center h-[55px]">
			<Search />
			<input
				type="text"
				id="search"
				placeholder="Faça algo mágico.."
				class="text-zinc-600 placeholder:text-zinc-600 font-medium bg-transparent w-full h-full outline-none"
				bind:value
				on:input={debounce(getCommunities, 300)}
			/>
		</label>
		{#if communities.length}
			<ul
				class="flex flex-col gap-y-4 py-4 border-t border-zinc-700 max-h-[calc(48px*4+16px*3+32px)] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-700 pr-4"
			>
				{#each communities as c}
					<li class="flex justify-between items-center">
						<div class="flex">
							<img src={c.icon} alt={c.name} class="w-10 h-10 rounded-lg" />
							<div class="flex flex-col ml-4">
								<strong class="font-medium text-zinc-200 text-xl">{c.name}</strong>
								<span class="text-sm text-zinc-400"
									>{formatQuantity(c.members)} membros</span
								>
							</div>
						</div>
						<a
							href={c.link}
							class="border border-zinc-600 rounded px-2 py-1 text-zinc-400 bg-zinc-700 leading-4"
							>Entrar</a
						>
					</li>
				{/each}
			</ul>
		{/if}
	</form>
</main>