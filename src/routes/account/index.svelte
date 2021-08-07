<script>
	import Cookie from 'js-cookie';
	import { onMount } from 'svelte';
	import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte';
	import GiSpinningRibbons from 'svelte-icons/gi/GiSpinningRibbons.svelte';

	let user;
	let loading = true;

	const handleSignOut = async () => {
		Cookie.remove('jwt');
		window.location.href = '/signin';
	};

	onMount(async () => {
		try {
			loading = true;

			const res = await fetch('/api/v1/auth/user', { method: 'GET' });
			const body = await res.json();

			user = body.data;
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="loading w-14 animate-spin mx-auto mt-4">
		<GiSpinningRibbons />
	</div>
{:else}
	<div class="bg-gamefinite_white mt-4 p-4 rounded-md shadow-md">
		<div class="h-20 my-4">
			<FaUserCircle />
		</div>
		<div class="flex flex-col">
			<h1 class="text-2xl text-center font-bold my-4">
				{`Id : ${user._id}`}
			</h1>
			<h1 class="text-2xl text-center font-bold my-4 capitalize">
				{`Name : ${user.name}`}
			</h1>
			<h1 class="text-2xl text-center font-bold my-4">
				{`Email : ${user.email}`}
			</h1>
			<h1 class="text-2xl text-center font-bold my-4 capitalize">
				{`Status : ${user.status}`}
			</h1>
			<h1 class="text-2xl text-center font-bold my-4 capitalize">
				{`Joined At : ${new Date(user.createdAt).toDateString()}`}
			</h1>
			{#if user.premiumExpired}
				<h1 class="text-2xl text-center font-bold my-4 capitalize">
					{`Expired At : ${new Date(user.premiumExpired).toDateString()}`}
				</h1>
			{:else}
				<h1 class="text-2xl text-center font-bold my-4 capitalize">
					{`Expired At : Not Subscribe`}
				</h1>
			{/if}
			<button
				class="bg-gamefinite_black text-gamefinite_white px-2 py-4 mx-auto rounded-md"
				on:click={handleSignOut}
			>
				Sign out
			</button>
		</div>
	</div>
{/if}

<style>
	.loading {
		color: #ededed;
	}
</style>
