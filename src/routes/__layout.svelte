<script context="module">
	export async function load({ page, session }) {
		const { path } = page;
		const { authenticated } = session;

		if (authenticated && (path === '/signin' || path === '/signup'))
			return {
				status: 302,
				redirect: '/'
			};

		if (!authenticated && path !== '/signin' && path != '/signup')
			return {
				status: 302,
				redirect: '/signin'
			};

		return { props: { path } };
	}
</script>

<script>
	export let path;

	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
</script>

{#if path !== '/signin' && path !== '/signup'}
	<div class="app flex flex-col min-h-screen bg-gamefinite_gray w-full font-manrope">
		<Nav current={path} />

		<main class="max-w-screen-2xl mx-auto">
			<slot />
		</main>

		<footer class="mt-auto bg-gamefinite_black py-5">
			<h1 class="text-gamefinite_white text-center text-sm">Copyright © 2021 Gamefinite</h1>
		</footer>
	</div>
{:else}
	<slot />
{/if}

<style>
	main {
		min-width: 80%;
	}
</style>
