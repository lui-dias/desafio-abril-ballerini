<script lang="ts">
	import { themeStore } from '../stores/themeStore'
	import type { useTranslations } from '../utils'
	import Dark from './icons/Dark.svelte'
	import Light from './icons/Light.svelte'

	export let t: ReturnType<typeof useTranslations>
	export let lang: string
</script>

<header class="pt-6 flex gap-x-6 justify-center absolute right-0 w-full">
	<div class="relative -translate-y-0.5">
		<button
			type="button"
			class="group font-medium text-xl text-zinc-700 dark:text-zinc-300 rounded-lg mb-6 w-fit uppercase relative"
		>
			{lang}
			<ul
				class="bg-zinc-300 dark:bg-zinc-800 p-3 rounded-lg flex-col gap-y-2 hidden group-focus-within:flex absolute transform -translate-x-1/2 left-1/2 top-[calc(100%+8px)]"
			>
				<li>
					<a href="/en" class="text-zinc-700 dark:text-zinc-300">English</a>
				</li>
				<li>
					<a href="/pt" class="text-zinc-700 dark:text-zinc-300">Português</a>
				</li>
			</ul>
		</button>
	</div>
	<div class="relative">
		<button type="button" class="group font-medium w-fit relative">
			{#if $themeStore === 'dark'}
				<Dark />
			{:else}
				<Light />
			{/if}
			<span class="sr-only">{t('theme')}</span>
			<ul
				class="bg-zinc-300 dark:bg-zinc-800 p-3 rounded-lg flex-col gap-y-2 hidden group-focus-within:flex absolute transform -translate-x-1/2 left-1/2 top-[calc(100%+8px)]"
			>
				<li>
					<button
						type="button"
						class="flex gap-x-2"
						on:click={() => themeStore.set('light')}
					>
						<Light />
						<span class="text-zinc-700 dark:text-zinc-300">Light</span>
					</button>
				</li>
				<li>
					<button
						type="button"
						class="flex gap-x-2"
						on:click={() => themeStore.set('dark')}
					>
						<Dark />
						<span class="text-zinc-700 dark:text-zinc-300">Dark</span>
					</button>
				</li>
			</ul>
		</button>
	</div>
</header>
