const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
                primary: colors.blue,
				secondary: colors.gray, // a softer color to complement cyan
				accent: colors.orange, // for accent, a contrasting color to cyan
                background: colors.slate['100'],
                backgroundalt: colors.white,
				darkerblue: colors.blue['900'], // dark variant of blue
				lighterblue: colors.blue['200'], // light variant of blue
				offwhite: colors.gray['50'], // offwhite, almost white color
				darkgray: colors.gray['800'], // darker gray
				lightgray: colors.gray['200'], // lighter gray
				success: colors.emerald, // success usually relates to green color
				warning: colors.amber, // warning usually relates to yellow/orange color
				error: colors.red, // error usually relates to red color
                maintext: colors.gray['700'],
                maintextalt: colors.white,
                title: colors.gray['800'],
                subtitle: colors.gray['500'],
			},
			fontFamily: {
				secular: ["Secular One", "sans-serif"],
			},
			boxShadow: {
				box: "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
			},
		},
	},
	plugins: [],
};
