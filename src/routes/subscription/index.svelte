<script>
	import { onMount } from 'svelte';

	let cardNumber;
	let date;
	let cvv;
	let subscriptionType;
	let loading = false;
	let isSubscribe;

	const handlePayment = async () => {
		if (cardNumber && date && cvv && subscriptionType) {
			loading = true;
			const res = await fetch('/api/v1/auth/subscription', {
				method: 'POST',
				body: JSON.stringify({ subscriptionType }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			loading = false;

			if (res.status === 200) {
				setTimeout(() => {
					window.location.href = '/account';
				}, 1000);
			}
		}
	};

	onMount(async () => {
		try {
			loading = true;

			const res = await fetch('/api/v1/auth/user', { method: 'GET' });
			const body = await res.json();

			const user = body.data;
			isSubscribe = Date.now() < new Date(user.premiumExpired).getTime();
		} finally {
			loading = false;
		}
	});
</script>

<div class="bg-gamefinite_white my-4 p-8 flex flex-col rounded-md shadow-md">
	{#if !loading}
		{#if isSubscribe}
			<h1 class="text-2xl text-center">User has been subscribed</h1>
		{:else}
			<div class="input-container my-4">
				<label class="mr-4" for="password text-gamefinite_white">Card Number :</label>
				<input
					type="text"
					id="card-number"
					class="p-2 rounded-md focus:outline-none bg-gamefinite_black text-gamefinite_white"
					autocomplete="off"
					bind:value={cardNumber}
				/>
			</div>

			<div class="input-container my-4">
				<label class="mr-4" for="password text-gamefinite_white">Expired Date :</label>
				<input
					type="date"
					id="card-number"
					class="p-2 rounded-md focus:outline-none bg-gamefinite_black text-gamefinite_white"
					autocomplete="off"
					bind:value={date}
				/>
			</div>

			<div class="input-container my-4">
				<label class="mr-4" for="password text-gamefinite_white">CVV :</label>
				<input
					type="text"
					id="card-number"
					class="p-2 rounded-md focus:outline-none bg-gamefinite_black text-gamefinite_white"
					autocomplete="off"
					bind:value={cvv}
				/>
			</div>

			<div class="input-container my-4">
				<label class="mr-4" for="subscription">Subscription :</label>

				<select name="subscription" id="subscription" bind:value={subscriptionType}>
					<option value="monthly">Monthly - $12.99</option>
					<option value="yearly">Yearly - $100.99</option>
				</select>
			</div>
			<button
				class="bg-gamefinite_red text-gamefinite_white py-4 rounded-md"
				on:click={handlePayment}
			>
				pay
			</button>
		{/if}
	{:else}
		<h1 class="text-2xl text-center">Loading</h1>
	{/if}
</div>

<style>
	::-webkit-calendar-picker-indicator {
		filter: invert(1);
	}
</style>
