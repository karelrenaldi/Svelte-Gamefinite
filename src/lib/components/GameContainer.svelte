<script>
	export let title, url;

	import { onMount } from 'svelte';
	import GiSpinningRibbons from 'svelte-icons/gi/GiSpinningRibbons.svelte';

	let recomGames = [];

	onMount(async () => {
		const res = await fetch(url);
		const body = await res.json();

		recomGames = body.results;
	});
</script>

<div class="container my-4 bg-gamefinite_black p-6 rounded-md shadow-md">
	<h1 class="text-4xl font-bold text-gamefinite_white mb-4">{title}</h1>
	<div class="grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center">
		{#if recomGames.length === 0}
			<div class="loading w-14 animate-spin mx-auto mt-4">
				<GiSpinningRibbons />
			</div>
		{/if}

		{#each recomGames as recomGame}
			<a
				class="p-6 bg-gamefinite_white text-gamefinite_black text-center 
        rounded-md shadow-sm hover:shadow-md flex flex-col items-center my-4"
				href={`/pokemon/${recomGame.id}`}
			>
				<img class="rounded-md" src={recomGame.background_image} alt={recomGame.name} />
				<h2 class="capitalize text-xl">{recomGame.name}</h2>
			</a>
		{/each}
	</div>
</div>

<style>
	a {
		height: 300px;
		width: 300px;
	}

	img {
		height: auto;
		width: 100%;
		height: 200px;
	}

	.loading {
		color: #ededed;
	}

	.container {
		min-width: 80%;
	}
</style>
