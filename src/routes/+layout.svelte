<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="dark relative h-screen w-full bg-black font-geist-mono text-white">
	<!-- Fixed gradient background -->
	<div
		class="fixed inset-0 z-0 bg-gradient-to-br from-blue-400/20 via-transparent to-neutral-400/20"
	></div>

	<!-- Scrollable content container -->
	<div class="relative z-10 flex h-full w-full justify-center overflow-auto py-8">
		{@render children()}
	</div>
</div>
