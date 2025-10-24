import { command } from '$app/server';
import { z } from 'zod';

const VERCEL_SETUP_PROMPT = `
Setup this SvelteKit project to be deployed to Vercel by doing the following:

1. install the adapter and get rid of the old one:
bun add -D @sveltejs/adapter-vercel
bun remove @sveltejs/adapter-auto
2. update the svelte.config.js file to use the new adapter:
import adapter from '@sveltejs/adapter-vercel';
`;

const CLOUDFLARE_SETUP_PROMPT = `
Setup this SvelteKit project to be deployed to Cloudflare workers by doing the following:
1. install the adapter and get rid of the old one:
bun add -D @sveltejs/adapter-cloudflare
bun remove @sveltejs/adapter-auto
2. update the svelte.config.js file to use the new adapter:
import adapter from '@sveltejs/adapter-cloudflare';
3. update the scripts in package.json to be the following:
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "bun run build && wrangler dev",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"deploy": "bun run build && wrangler deploy",
		"cf-typegen": "wrangler types ./src/worker-configuration.d.ts",
		"format": "prettier --write .",
		"lint": "prettier --check ."
	},
4. create a wrangler.jsonc file in the root of the project with the following content:
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "",
	"main": ".svelte-kit/cloudflare/_worker.js",
	"compatibility_flags": ["nodejs_compat"],
	"compatibility_date": "2025-10-11",
	"assets": {
		"binding": "ASSETS",
		"directory": ".svelte-kit/cloudflare"
	},
	"observability": {
		"enabled": true
	}
}
fill the name with the name in the package.json file.
5. generate the types with: bun run cf-typegen
6. update app.d.ts to be the following:
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
`;

const CURSOR_RULES_PROMPT = `
Setup the cursor rules for this project by doing the following:

1. make sure the cursor rules directory exists (".cursor/rules"), if it doesn't, create it
2. run the following commands to populate the rules directory:
curl "https://www.davis7.sh/sv/rules?rule=global" -o .cursor/rules/global.mdc && \
curl "https://www.davis7.sh/sv/rules?rule=neverthrow" -o .cursor/rules/neverthrow.mdc && \
curl "https://www.davis7.sh/sv/rules?rule=svelte" -o .cursor/rules/svelte.mdc && \
curl "https://www.davis7.sh/sv/rules?rule=tailwindcss" -o .cursor/rules/tailwindcss.mdc
`;

const USEFUL_PACKAGES_PROMPT = `
Run the following command to install packages for this project:
bun add zod neverthrow runed
`;

const ASYNC_SVELTE_PROMPT = `
Update the svelte.config.js file to support async svelte:

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

The only thing you should be touching is the compilerOptions: { experimental: { async: true } } section and the experimental: { remoteFunctions: true } section, leave the rest of the file alone.
`;

const VSCODE_THEME_PROMPT = (opts: { topBarColor: string; topBarTextColor: string }) => `
add a vscode conifg file that sets the top bar to be ${opts.topBarColor} with ${opts.topBarTextColor} text 
`;

const TAILWIND_THEME_PROMPT = (opts: { primaryColor: string }) => `
in @app.css could you setup a basic theme for this site. It should be light mode with tailwind neutral colors, and set the primary color to be ${opts.primaryColor}
`;

const HELLO_WORLD_PROMPT = `
setup the root layout and page to be nicer:

---

<script lang="ts">
	// +layout.ts
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>My SvelteKit App</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-between bg-neutral-50 text-neutral-800">
	<header class="py-4"></header>
	{@render children?.()}
	<footer class="py-4"></footer>
</div>

---

<script lang="ts">
	// +page.svelte
	import logo from '$lib/assets/favicon.svg';
</script>

<main class="flex grow flex-col items-center justify-center gap-4">
	<div class="flex flex-row items-center justify-center gap-2">
		<img src={logo} alt="Logo" class="h-24 w-24" />
		<h2 class="text-3xl font-bold"><span class="text-primary">SvelteKit</span> App</h2>
	</div>
	<p class="text-center text-lg text-neutral-500">Welcome to your new SvelteKit project.</p>
</main>

---

NOTE: if there is not a primary color set, just use orange-500
`;

const getPromptsSchema = z.object({
	vercelSetup: z.boolean(),
	cloudflareSetup: z.boolean(),
	cursorRules: z.boolean(),
	usefulPackages: z.boolean(),
	asyncSvelte: z.boolean(),
	helloWorld: z.boolean(),
	vscodeTheme: z
		.object({
			topBarColor: z.string(),
			topBarTextColor: z.string()
		})
		.optional(),
	tailwindTheme: z
		.object({
			primaryColor: z.string()
		})
		.optional()
});

export const remoteGetPrompts = command(getPromptsSchema, (opts) => {
	const prompts = [];
	if (opts.asyncSvelte) prompts.push(ASYNC_SVELTE_PROMPT);
	if (opts.cursorRules) prompts.push(CURSOR_RULES_PROMPT);
	if (opts.usefulPackages) prompts.push(USEFUL_PACKAGES_PROMPT);
	if (opts.vercelSetup) prompts.push(VERCEL_SETUP_PROMPT);
	if (opts.cloudflareSetup) prompts.push(CLOUDFLARE_SETUP_PROMPT);
	if (opts.vscodeTheme) prompts.push(VSCODE_THEME_PROMPT(opts.vscodeTheme));
	if (opts.tailwindTheme) prompts.push(TAILWIND_THEME_PROMPT(opts.tailwindTheme));
	if (opts.helloWorld) prompts.push(HELLO_WORLD_PROMPT);
	return prompts.join('\n');
});
