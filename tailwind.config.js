/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				maintext: "rgb(var(--color-maintext) / <alpha-value>)",
				mainblack: "rgb(var(--color-mainblack) / <alpha-value>)",
				mainbg: "rgb(var(--color-mainbg) / <alpha-value>)",
				mainshadow: "rgb(var(--color-mainshadow) / <alpha-value>)",
				accent: "rgb(var(--color-accent) / <alpha-value>)",
				"accent-light": "rgb(var(--color-accent-light) / <alpha-value>)",
				contrast: "rgb(var(--color-contrast) / <alpha-value>)",
			},
			fontFamily: {
				main: ["ui-sans-serif", "system-ui"],
			},
		},
	},
	plugins: [],
	darkMode: "media", // 'media' or 'class'
	variants: {
		extend: {},
	},
};
