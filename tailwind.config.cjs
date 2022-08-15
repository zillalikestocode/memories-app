/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
    	gridTemplateColumns: {
    		"auto": "repeat(auto-fill, minmax(12rem, 1fr))"
    	}
    },
  },
  plugins: [],
}
