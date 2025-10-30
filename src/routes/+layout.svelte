<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<div class="relative min-h-screen w-full">
	<div
		class="z-5 fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(107,114,128,0.1),transparent_80%)]"
	></div>
	<div
		class="z-5 fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(75,85,99,0.1),transparent_80%)]"
	></div>

	<div class="relative z-10 flex h-full w-full justify-center overflow-auto py-8 pb-24">
		{@render children()}
	</div>
</div>
