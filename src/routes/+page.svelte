<script>
	import SocialLinks from '$lib/components/SocialLinks.svelte';
</script>

<svelte:head>
	<title>Davis - dev/youtuber</title>
	<meta
		name="description"
		content="Davis is a dev/youtuber. Built Insiderviz, manages Theo's YouTube channel, and more."
	/>
</svelte:head>

<main class="z-10 px-3 text-center">
	<article class="prose prose-neutral prose-invert pb-16 text-left">
		<h1 class="mb-0 pb-0">Davis</h1>
		<p class="m-0">SF based software engineer and YouTuber</p>
		<p>
			I manage <a href="https://www.youtube.com/@t3dotgg/videos" target="_blank"
				>Theo's YouTube Channel</a
			>, build random projects, and run a channel of
			<a href="https://www.youtube.com/@bmdavis419" target="_blank">my own</a>.
		</p>

		<h2>Stuff I've Built</h2>

		<p>
			<a href="https://insiderviz.com" target="_blank">Insiderviz</a> is the biggest project I've shipped
			myself. It's an insider trading data visualization platform.
		</p>

		<p>
			<a href="https://www.youtube.com/@bmdavis419" target="_blank">My YouTube Channel</a> is where I
			post random projects I've built.
		</p>

		<p>
			<a href="https://quickbg.davis7.sh" target="_blank">Quick SVG Background</a> is a simple tool to
			quickly add a background to your SVG. Super useful for thumbnails and other social media posts.
		</p>

		<p>
			<a href="https://www.theblokapp.com" target="_blank">BLOK</a> is a project I've been messing around
			on for a while. It's a social calendar app. Very much a work in progress, want to ship something
			later this year.
		</p>

		<p>
			<a href="https://github.com/bmdavis419" target="_blank">My GitHub</a> has a bunch of the random
			OSS things I've built. The biggest one is an open source e-commerce site built with SvelteKit.
		</p>
	</article>
	<SocialLinks />
</main>
