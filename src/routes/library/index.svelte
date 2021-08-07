<script>
	import { API_GAME_URL, API_GAME_KEY } from '$lib/config/server';
	import GameContainer from '$lib/components/GameContainer.svelte';
</script>

<div class="w-full">
	<GameContainer
		title="Action Games"
		url={`${API_GAME_URL}/games?page_size=8&genres=action&key=${API_GAME_KEY}`}
	/>
	<GameContainer
		title="Indie Games"
		url={`${API_GAME_URL}/games?page_size=8&genres=indie&key=${API_GAME_KEY}`}
	/>
	<GameContainer
		title="Advanture Games"
		url={`${API_GAME_URL}/games?page_size=8&genres=adventure&key=${API_GAME_KEY}`}
	/>
	<GameContainer
		title="Strategy Games"
		url={`${API_GAME_URL}/games?page_size=8&genres=strategy&key=${API_GAME_KEY}`}
	/>
</div>
