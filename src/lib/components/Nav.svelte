<script>
	export let current;
	import GiHamburgerMenu from 'svelte-icons/gi/GiHamburgerMenu.svelte';

	if (!current) current = '/';
	let isOpenDropdown = false;

	const options = [
		{ link: '/', title: 'Home' },
		{ link: '/library', title: 'Library' },
		{ link: '/subscription', title: 'Subscription' },
		{ link: '/account', title: 'Account' }
	];

	const handleHamburgerClick = () => {
		isOpenDropdown = !isOpenDropdown;
	};
</script>

<nav class="font-quicksand font-bold">
	<section class="flex items-center justify-between py-4 px-4 bg-gamefinite_black">
		<h1 class="text-2xl lg:text-6xl md:text-4xl text-gamefinite_white ml-1 md:ml-4">Gamefinite</h1>

		<div class="nav-list text-2xl px-4">
			{#each options as option}
				<a
					href={option.link}
					class={`mx-4 text-gamefinite_red p-1 ${
						option.link === current && 'border-b-2 border-gamefinite_white'
					}`}>{option.title}</a
				>
			{/each}
		</div>

		<div class="nav-hamburger w-7 md:hidden text-gamefinite_red" on:click={handleHamburgerClick}>
			<GiHamburgerMenu />
		</div>
	</section>

	<section
		class={`dropdown md:hidden bg-gamefinite_red flex flex-col ${
			isOpenDropdown ? 'dropdown-open' : 'dropdown-close'
		}`}
	>
		<ul>
			{#each options as option}
				<li
					class={`text-gamefinite_white text-center text-lg md:text-xl ${
						option.title === current && 'text-gamefinite_black'
					}`}
				>
					<a href={option.link}>{option.title}</a>
				</li>
			{/each}
		</ul>
	</section>
</nav>

<style>
	@media (max-width: 1000px) {
		section .nav-list {
			display: none;
		}

		section .nav-hamburger {
			display: inline-block;
		}

		.dropdown {
			padding: 1.5em 0;
			display: block;
		}

		.dropdown.dropdown-open {
			display: block;
		}

		.dropdown.dropdown-close {
			display: none;
		}

		.dropdown li + li {
			margin-top: 1em;
		}
	}
</style>
