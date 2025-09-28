<script>
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="dark relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-geist-mono text-white"
>
	<div
		class="z-5 fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(107,114,128,0.1),transparent_80%)]"
	></div>
	<div
		class="z-5 fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(75,85,99,0.1),transparent_80%)]"
	></div>

	<div class="relative z-10 flex h-full w-full justify-center overflow-auto py-8">
		{@render children()}
	</div>
</div>
