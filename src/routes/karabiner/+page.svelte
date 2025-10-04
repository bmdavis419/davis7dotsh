<script lang="ts">
	import { codeToHtml } from 'shiki';
	import { Copy } from 'lucide-svelte';
	import Keyboard from '$lib/components/Keyboard.svelte';
	import myConfig from './karabiner.json';

	let html = $state('');
	let showModal = $state(false);

	$effect(() => {
		const run = async () => {
			const innerHtml = await codeToHtml(JSON.stringify(myConfig, null, 2), {
				lang: 'json',
				theme: 'github-dark',
				colorReplacements: {
					'#24292e': '#262626'
				}
			});
			html = innerHtml;
		};

		run();
	});

	const copy = () => {
		navigator.clipboard.writeText(JSON.stringify(myConfig));
	};
</script>

<div class="flex flex-col items-start gap-8">
	<a href="/" class="text-accent hover:text-accent/80 mb-2 transition-colors">← Back to Home</a>
	<h2 class="text-primary text-2xl font-semibold">My Karabiner Config</h2>

	<p class="text-secondary leading-relaxed">
		This is my "hyper key" config, you can download Karabiner elements
		<a
			href="https://karabiner-elements.pqrs.org/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-accent underline transition-opacity hover:opacity-80">here</a
		>.
	</p>

	<button
		class="bg-accent text-background mt-4 rounded-md px-4 py-2 font-semibold transition-opacity hover:opacity-80"
		onclick={() => (showModal = true)}
	>
		View Full Config
	</button>

	<Keyboard />

	<p class="text-secondary">Keybindings:</p>
	<ul class="w-full space-y-2 font-bold">
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Caps Lock to Hyper</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + a to cmd+a</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">
			Hyper + j/k to pageup/pagedown
		</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">
			Hyper + h/l to left/right arrow
		</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + c to cmd + c</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + v to cmd + v</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + t to cmd + t</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + w to cmd + w</li>
	</ul>
</div>

{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		onclick={() => (showModal = false)}
	>
		<div
			class="z-50 max-h-[90vh] max-w-4xl overflow-auto rounded-lg border border-neutral-800 bg-neutral-900 p-6"
		>
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-primary text-xl font-semibold">Full Karabiner Configuration</h3>
				<button
					class="text-secondary hover:text-primary transition-colors"
					onclick={() => (showModal = false)}
				>
					✕
				</button>
			</div>
			<div class="mb-4">
				<button
					class="bg-accent text-background flex items-center gap-2 rounded-md px-3 py-2 font-semibold transition-opacity hover:opacity-80"
					onclick={copy}
				>
					<Copy size={16} />
					Copy Config
				</button>
			</div>
			<div class="rounded-lg bg-neutral-800 p-4 text-sm">
				{@html html}
			</div>
		</div>
	</div>
{/if}
