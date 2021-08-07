<script>
	import { onMount } from 'svelte';
	import { API_GAME_KEY, API_GAME_URL } from '$lib/config/server';
	import GiSpinningRibbons from 'svelte-icons/gi/GiSpinningRibbons.svelte';

	let recomGames = [];

	onMount(async () => {
		const url = `${API_GAME_URL}/games?page_size=10&key=${API_GAME_KEY}`;
		const res = await fetch(url);
		const body = await res.json();

		recomGames = body.results;
	});
</script>

<div>
	<div
		class="banner mx-auto p-8 mt-4 rounded-md shadow-md text-center 
        text-center text-gamefinite_white bg-gamefinite_red max-w-2xl"
	>
		<h1 class="text-2xl font-extrabold">Gamefinite Summer Sale</h1>
		<div
			class="bg-gamefinite_black text-xl text-gamefinite_white 
            my-5 rounded-md py-4 font-bold max-w-xl mx-auto"
		>
			<h2>SUBSCRIPTION 40% OFF</h2>
			<h2>1 July - 12 July 2021</h2>
		</div>
		<button
			class="bg-gamefinite_black p-4 bg-gamefinite_black 
        text-gamefinite_white font-bold rounded-md"
		>
			Subscribe Now
		</button>
	</div>

	<h1 class="text-center text-2xl mt-4 font-bold underline text-gamefinite_white">
		Recommendation Game
	</h1>
	{#if recomGames.length === 0}
		<div class="loading w-14 animate-spin mx-auto mt-4">
			<GiSpinningRibbons />
		</div>
	{/if}
	<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1 mx-4">
		{#each recomGames as recomGame}
			<a
				class="p-6 bg-gamefinite_black text-gamefinite_white text-center 
			rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
				href={`/pokemon/${recomGame.id}`}
			>
				<img class="h-40" src={recomGame.background_image} alt={recomGame.name} />
				<h2 class="capitalize text-2xl">{recomGame.name}</h2>
			</a>
		{/each}
	</div>
</div>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(3deg);
		}
		50% {
			transform: rotate(0deg);
		}
		75% {
			transform: rotate(-3deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

	.banner div {
		animation: spin 2s infinite;
	}

	.loading {
		color: #ededed;
	}
</style>
