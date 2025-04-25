<script lang="ts">
	import { codeToHtml } from 'shiki';
	import { myConfig } from './myConfig';
	import { Copy } from 'lucide-svelte';

	let html = $state('');

	$effect(() => {
		const run = async () => {
			html = await codeToHtml(myConfig, {
				lang: 'json',
				theme: 'github-dark'
			});
		};

		run();
	});

	const copy = () => {
		navigator.clipboard.writeText(myConfig);
	};
</script>

<div class="flex flex-col gap-8">
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

	<p class="text-secondary">Keybindings:</p>
	<ul class="space-y-2 font-bold">
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Caps Lock to Hyper</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + a to cmd+a</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">
			Hyper + j/k to pageup/pagedown
		</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">
			Hyper + h/l to left/right arrow
		</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + c to copy</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + v to paste</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + t to cmd+t</li>
		<li class="text-secondary border-border border-b py-2 last:border-b-0">Hyper + w to cmd+w</li>
	</ul>

	<div class="relative rounded-lg bg-[#24292E] p-4">
		<button class="absolute right-2 top-2 rounded-md p-2 hover:bg-neutral-900" onclick={copy}>
			<Copy />
		</button>
		<div class="text-sm">
			{@html html}
		</div>
	</div>
</div>
