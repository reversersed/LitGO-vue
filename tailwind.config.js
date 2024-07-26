/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				maintext: "#FEFFFF",
				mainbg: "#3AAFA9",
				mainshadow: "#2B7A78",
				accent: "#17252A",
			},
		},
	},
	plugins: [],
	darkMode: "media", // 'media' or 'class'
	variants: {
		extend: {},
	},
};
