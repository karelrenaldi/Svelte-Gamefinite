const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				gamefinite_black: '#171717',
				gamefinite_gray: '#444444',
				gamefinite_red: '#DA0037',
				gamefinite_white: '#EDEDED'
			},
			fontFamily: {
				manrope: ['Manrope'],
				quicksand: ['Quicksand']
			}
		}
	},
	plugins: []
};

module.exports = config;
