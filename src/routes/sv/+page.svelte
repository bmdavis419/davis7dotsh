<script lang="ts">
	import { remoteGetPrompts } from '$lib/prompts.remote';

	let vercelSetup = $state(false);
	let cursorRules = $state(false);
	let usefulPackages = $state(false);
	let asyncSvelte = $state(false);
	let helloWorld = $state(false);
	let vscodeThemeEnabled = $state(false);
	let topBarColor = $state('#1f2937');
	let topBarTextColor = $state('#ffffff');
	let tailwindThemeEnabled = $state(false);
	let primaryColor = $state('#f97316');

	let toastMessage = $state<string | null>(null);
	let toastType = $state<'success' | 'error'>('success');
	let isLoading = $state(false);

	function showToast(message: string, type: 'success' | 'error' = 'success') {
		toastMessage = message;
		toastType = type;
		setTimeout(() => {
			toastMessage = null;
		}, 3000);
	}

	async function copyPrompts() {
		isLoading = true;
		try {
			const prompts = await remoteGetPrompts({
				vercelSetup,
				cursorRules,
				usefulPackages,
				asyncSvelte,
				helloWorld,
				vscodeTheme: vscodeThemeEnabled ? { topBarColor, topBarTextColor } : undefined,
				tailwindTheme: tailwindThemeEnabled ? { primaryColor } : undefined
			});

			await navigator.clipboard.writeText(prompts);
			showToast('Prompts copied to clipboard!', 'success');
		} catch (error) {
			showToast(
				`Failed to copy prompts: ${error instanceof Error ? error.message : 'Unknown error'}`,
				'error'
			);
		} finally {
			isLoading = false;
		}
	}

	function toggleAll() {
		const allChecked =
			vercelSetup &&
			cursorRules &&
			usefulPackages &&
			asyncSvelte &&
			helloWorld &&
			vscodeThemeEnabled &&
			tailwindThemeEnabled;
		vercelSetup = !allChecked;
		cursorRules = !allChecked;
		usefulPackages = !allChecked;
		asyncSvelte = !allChecked;
		helloWorld = !allChecked;
		vscodeThemeEnabled = !allChecked;
		tailwindThemeEnabled = !allChecked;
	}
</script>

<div class="w-full max-w-2xl space-y-8">
	<div class="space-y-4">
		<a
			href="/"
			class="mb-4 inline-block text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-300"
			>← Back to Home</a
		>
		<div class="flex items-center justify-between">
			<h1 class="text-4xl font-bold text-white">SvelteKit Setup</h1>
			<button
				onclick={toggleAll}
				class="rounded-lg border border-neutral-600 px-3 py-1 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-neutral-200"
			>
				Toggle All
			</button>
		</div>
		<p class="text-lg text-neutral-300">
			An easy way to setup you SvelteKit project. Select the options you want to enable and copy the
			prompts to your clipboard, then paste them into cursor.
		</p>
		<p class="text-lg text-neutral-300">
			This will not create a project for you, to do that run: <code
				class="rounded-md bg-neutral-900 px-2 py-1 font-mono text-sm text-neutral-200"
				>bunx sv create</code
			>. I recommend picking: minimal, typescript, prettier/tailwindcss, and then bun.
		</p>
	</div>

	<div class="space-y-8">
		<!-- Basic Prompts -->
		<div class="space-y-4">
			<h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-400">Setup Options</h2>
			<div class="space-y-4">
				<label class="flex cursor-pointer items-center gap-3">
					<input
						type="checkbox"
						bind:checked={vercelSetup}
						class="h-4 w-4 cursor-pointer rounded border-neutral-600 text-blue-500"
					/>
					<span class="text-sm font-medium text-neutral-200">Vercel Setup</span>
				</label>
				<label class="flex cursor-pointer items-center gap-3">
					<input
						type="checkbox"
						bind:checked={cursorRules}
						class="h-4 w-4 cursor-pointer rounded border-neutral-600 text-blue-500"
					/>
					<span class="text-sm font-medium text-neutral-200">Cursor Rules</span>
				</label>
				<label class="flex cursor-pointer items-center gap-3">
					<input
						type="checkbox"
						bind:checked={usefulPackages}
						class="h-4 w-4 cursor-pointer rounded border-neutral-600 text-blue-500"
					/>
					<span class="text-sm font-medium text-neutral-200">Useful Packages</span>
				</label>
				<label class="flex cursor-pointer items-center gap-3">
					<input
						type="checkbox"
						bind:checked={asyncSvelte}
						class="h-4 w-4 cursor-pointer rounded border-neutral-600 text-blue-500"
					/>
					<span class="text-sm font-medium text-neutral-200">Async Svelte</span>
				</label>
				<label class="flex cursor-pointer items-center gap-3">
					<input
						type="checkbox"
						bind:checked={helloWorld}
						class="h-4 w-4 cursor-pointer rounded border-neutral-600 text-blue-500"
					/>
					<span class="text-sm font-medium text-neutral-200">Hello World</span>
				</label>
			</div>
		</div>

		<!-- VSCode Theme -->
		<div class="space-y-4">
			<label class="flex cursor-pointer items-center gap-3">
				<input
					type="checkbox"
					bind:checked={vscodeThemeEnabled}
					class="h-4 w-4 cursor-pointer rounded border-neutral-600 text-blue-500"
				/>
				<span class="font-medium text-neutral-200">VSCode Theme</span>
			</label>
			{#if vscodeThemeEnabled}
				<div class="space-y-4 pl-7">
					<div>
						<label
							for="topBarColor"
							class="mb-3 block text-xs font-medium uppercase tracking-wide text-neutral-400"
							>Top Bar Color</label
						>
						<div class="flex items-center gap-3">
							<input
								type="color"
								id="topBarColor"
								bind:value={topBarColor}
								class="h-8 w-12 cursor-pointer rounded border border-neutral-600"
							/>
							<input
								type="text"
								bind:value={topBarColor}
								class="flex-1 rounded border border-neutral-600 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-200"
							/>
						</div>
					</div>
					<div>
						<label
							for="topBarTextColor"
							class="mb-3 block text-xs font-medium uppercase tracking-wide text-neutral-400"
							>Top Bar Text Color</label
						>
						<div class="flex items-center gap-3">
							<input
								type="color"
								id="topBarTextColor"
								bind:value={topBarTextColor}
								class="h-8 w-12 cursor-pointer rounded border border-neutral-600"
							/>
							<input
								type="text"
								bind:value={topBarTextColor}
								class="flex-1 rounded border border-neutral-600 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-200"
							/>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Tailwind Theme -->
		<div class="space-y-4">
			<label class="flex cursor-pointer items-center gap-3">
				<input
					type="checkbox"
					bind:checked={tailwindThemeEnabled}
					class="h-4 w-4 cursor-pointer rounded border-neutral-600 text-blue-500"
				/>
				<span class="font-medium text-neutral-200">Tailwind Theme</span>
			</label>
			{#if tailwindThemeEnabled}
				<div class="space-y-4 pl-7">
					<div>
						<label
							for="primaryColor"
							class="mb-3 block text-xs font-medium uppercase tracking-wide text-neutral-400"
							>Primary Color</label
						>
						<div class="flex items-center gap-3">
							<input
								type="color"
								id="primaryColor"
								bind:value={primaryColor}
								class="h-8 w-12 cursor-pointer rounded border border-neutral-600"
							/>
							<input
								type="text"
								bind:value={primaryColor}
								class="flex-1 rounded border border-neutral-600 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-200"
							/>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Copy Button -->
		<div class="flex justify-start pt-4">
			<button
				onclick={copyPrompts}
				disabled={isLoading}
				class="rounded-lg border-2 border-blue-500 bg-transparent px-4 py-2 font-medium text-blue-300 transition-all hover:border-blue-400 hover:text-blue-200 disabled:border-neutral-600 disabled:text-neutral-500"
			>
				{'Copy Prompts'}
			</button>
		</div>
	</div>
</div>

<!-- Toast Notification -->
{#if toastMessage}
	<div
		class={`fixed bottom-6 right-6 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg transition-opacity ${toastType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
	>
		{toastMessage}
	</div>
{/if}

<style>
	input[type='checkbox'] {
		accent-color: rgb(37, 99, 235);
	}
</style>
