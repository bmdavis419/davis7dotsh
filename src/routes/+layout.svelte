<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-black font-geist-mono text-white">
	<div class="relative z-10">
		{@render children()}
	</div>
	<div
		class="absolute inset-0 z-0 bg-gradient-to-br from-blue-400/20 via-transparent to-orange-400/20"
	></div>
</div>
