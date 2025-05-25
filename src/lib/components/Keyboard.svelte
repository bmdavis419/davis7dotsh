<script lang="ts">
	import * as d3 from 'd3';

	let container: HTMLElement;

	// Simple keyboard layout: each row is an array of keys
	const layout: { label: string; width: number; title?: string; description?: string }[][] = [
		[
			{ label: 'Esc', width: 50 },
			{ label: 'F1', width: 40 },
			{ label: 'F2', width: 40 },
			{ label: 'F3', width: 40 },
			{ label: 'F4', width: 40 },
			{ label: 'F5', width: 40 },
			{ label: 'F6', width: 40 },
			{ label: 'F7', width: 40 },
			{ label: 'F8', width: 40 },
			{ label: 'F9', width: 40 },
			{ label: 'F10', width: 40 },
			{ label: 'F11', width: 40 },
			{ label: 'F12', width: 40 },
			{ label: 'Del', width: 50 }
		],
		[
			{ label: '`', width: 40 },
			{
				label: '1',
				width: 40,
				title: 'Helium',
				description: 'Hyper + 1 opens Helium (using raycast)'
			},
			{
				label: '2',
				width: 40,
				title: 'Ghosty',
				description: 'Hyper + 2 opens Ghosty (using raycast)'
			},
			{ label: '3', width: 40 },
			{ label: '4', width: 40 },
			{ label: '5', width: 40 },
			{ label: '6', width: 40 },
			{ label: '7', width: 40 },
			{ label: '8', width: 40 },
			{ label: '9', width: 40 },
			{ label: '0', width: 40 },
			{ label: '-', width: 40 },
			{ label: '=', width: 40 },
			{ label: 'Backspace', width: 80 }
		],
		[
			{ label: 'Tab', width: 60 },
			{ label: 'Q', width: 40 },
			{ label: 'W', width: 40 },
			{ label: 'E', width: 40 },
			{ label: 'R', width: 40 },
			{ label: 'T', width: 40 },
			{ label: 'Y', width: 40 },
			{ label: 'U', width: 40 },
			{ label: 'I', width: 40 },
			{ label: 'O', width: 40 },
			{ label: 'P', width: 40 },
			{ label: '[', width: 40 },
			{ label: ']', width: 40 },
			{ label: '\\', width: 60 }
		],
		[
			{ label: 'Caps', width: 70 },
			{ label: 'A', width: 40 },
			{ label: 'S', width: 40 },
			{ label: 'D', width: 40 },
			{ label: 'F', width: 40 },
			{ label: 'G', width: 40 },
			{ label: 'H', width: 40 },
			{ label: 'J', width: 40 },
			{ label: 'K', width: 40 },
			{ label: 'L', width: 40 },
			{ label: ';', width: 40 },
			{ label: "'", width: 40 },
			{ label: 'Enter', width: 90 }
		],
		[
			{ label: 'Shift', width: 90 },
			{ label: 'Z', width: 40 },
			{ label: 'X', width: 40 },
			{ label: 'C', width: 40 },
			{ label: 'V', width: 40 },
			{ label: 'B', width: 40 },
			{ label: 'N', width: 40 },
			{ label: 'M', width: 40 },
			{ label: ',', width: 40 },
			{ label: '.', width: 40 },
			{ label: '/', width: 40 },
			{ label: 'Shift', width: 90 }
		],
		[
			{ label: 'fn', width: 60 },
			{ label: 'ctrl', width: 60 },
			{ label: 'opt', width: 60 },
			{ label: 'cmd', width: 60 },
			{ label: '', width: 260 }, // Spacebar
			{ label: 'cmd', width: 60 },
			{ label: 'opt', width: 60 }
		]
	];

	const keyHeight = 40;
	const rowSpacing = 10;
	const keySpacing = 8;
	const svgWidth = 800;
	const svgHeight = layout.length * (keyHeight + rowSpacing) + rowSpacing;

	let keyTitle = $state('Hover a key');
	let keyDescription = $state('Hover one of the keys to see the keybinding');

	const setKey = (data: { title?: string; description?: string }) => {
		keyTitle = data.title || 'Hover a key';
		keyDescription = data.description || 'Hover one of the keys to see the keybinding';
	};

	let lastTimeout: number | null = null;

	function render() {
		d3.select(container).selectAll('*').remove();

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', svgWidth)
			.attr('height', svgHeight)
			.attr('class', 'w-full h-auto');

		const rowOffsets = [10, 10, 30, 40, 50, 10];

		let y = rowSpacing;
		layout.forEach((row, rowIndex) => {
			let x = rowOffsets[rowIndex];
			row.forEach((key) => {
				const isCapsLock = key.label === 'Caps';
				const hasKeybinding = key.title && key.description;
				const rectClass = isCapsLock
					? 'fill-orange-500/80 stroke-orange-400 stroke-2 drop-shadow-lg filter drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]'
					: hasKeybinding
						? 'fill-blue-400/40 stroke-blue-300/50 stroke-1 backdrop-blur-sm drop-shadow-sm'
						: 'fill-white/20 stroke-white/30 stroke-1 backdrop-blur-sm drop-shadow-sm';
				const textClass = isCapsLock
					? 'fill-white font-medium text-sm select-none drop-shadow-sm'
					: 'fill-white font-medium text-sm select-none';

				const keyGroup = svg.append('g');

				const rect = keyGroup
					.append('rect')
					.attr('x', x)
					.attr('y', y)
					.attr('width', key.width)
					.attr('height', keyHeight)
					.attr('rx', 6)
					.attr('class', rectClass);

				keyGroup
					.append('text')
					.attr('x', x + key.width / 2)
					.attr('y', y + keyHeight / 2)
					.attr('text-anchor', 'middle')
					.attr('dominant-baseline', 'central')
					.attr('class', textClass)
					.text(key.label);

				if (!isCapsLock) {
					keyGroup
						.style('cursor', 'pointer')
						.on('mouseenter', function () {
							rect.attr(
								'class',
								'fill-blue-600/80 stroke-blue-400 stroke-2 drop-shadow-lg filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]'
							);
							setKey(key);
							if (lastTimeout) {
								clearTimeout(lastTimeout);
							}
						})
						.on('mouseleave', function () {
							rect.attr('class', rectClass);
							if (lastTimeout) {
								clearTimeout(lastTimeout);
							}
							lastTimeout = setTimeout(() => {
								setKey({});
							}, 150);
						});
				}
				x += key.width + keySpacing;
			});
			y += keyHeight + rowSpacing;
		});
	}

	$effect(() => {
		render();
	});
</script>

<div bind:this={container} class="overflow-x-auto rounded-lg p-4"></div>

<section
	class="mt-2 flex items-center gap-6 rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
>
	<div class="flex-shrink-0">
		<div
			class="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-orange-600"
		>
			<svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"
				/>
			</svg>
		</div>
	</div>
	<div class="flex-1">
		<h2 class="mb-2 text-2xl font-bold text-white">{keyTitle}</h2>
		<p class="text-white/70">{keyDescription}</p>
	</div>
</section>
