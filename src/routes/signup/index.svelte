<script>
	import GiSpinningRibbons from 'svelte-icons/gi/GiSpinningRibbons.svelte';

	let name, email, password, passwordConfirm, err;
	let loading = false;

	const handleSignup = async () => {
		loading = true;
		err = '';
		try {
			const reqBody = { email: email.toLowerCase(), name, password };

			if (!name || !email || !password) {
				err = 'Please input all field';
			}

			if (password !== passwordConfirm) {
				err = 'Password and password confirm not match';
			}

			const res = await fetch('/api/v1/auth/signup', {
				method: 'POST',
				body: JSON.stringify(reqBody),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.status === 201) window.location = '/';
		} catch (err) {
			console.log(err);
			err = 'An error ocured';
		} finally {
			loading = false;
		}
	};
</script>

<main class="flex min-h-screen min-w-screen bg-gamefinite_black justify-center items-center">
	<div
		class="min-w-max w-4/5 max-w-xl bg-gamefinite_red p-20 rounded-lg shadow-md font-manrope 
        flex flex-col justify-center"
	>
		<h1 class="text-center text-4xl font-bold">Sign Up</h1>

		{#if !loading}
			<div class="input-container">
				<label for="name text-gamefinite_white">Name</label>
				<input
					type="text"
					id="name"
					class="p-2 rounded-md focus:outline-none bg-gamefinite_black text-gamefinite_white"
					autocomplete="off"
					bind:value={name}
				/>
			</div>

			<div class="input-container">
				<label for="name text-gamefinite_white">Email</label>
				<input
					type="text"
					id="email"
					class="p-2 rounded-md focus:outline-none bg-gamefinite_black text-gamefinite_white"
					autocomplete="email"
					bind:value={email}
				/>
			</div>

			<div class="input-container">
				<label for="password text-gamefinite_white">Password</label>
				<input
					type="password"
					id="password"
					class="p-2 rounded-md focus:outline-none bg-gamefinite_black text-gamefinite_white"
					autocomplete="off"
					bind:value={password}
				/>
			</div>

			<div class="input-container">
				<label for="password-confirm text-gamefinite_white">Password Confirm</label>
				<input
					type="password"
					id="password-confirm"
					class="p-2 rounded-md focus:outline-none bg-gamefinite_black text-gamefinite_white"
					autocomplete="off"
					bind:value={passwordConfirm}
				/>
			</div>

			<button
				class="px-4 py-3 rounded-md mt-4 bg-gamefinite_white font-bold"
				on:click={handleSignup}
			>
				Create Account
			</button>
		{:else}
			<div class="loading w-14 animate-spin mx-auto mt-4">
				<GiSpinningRibbons />
			</div>
		{/if}

		{#if err}
			<h1>{err}</h1>
		{/if}
	</div>
</main>

<style>
	.input-container {
		display: flex;
		flex-direction: column;
	}

	.input-container + .input-container {
		margin-top: 1em;
	}

	.loading {
		color: #ededed;
	}
</style>
