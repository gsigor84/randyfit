module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",      // Scan all files in the 'pages' directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan all files in the 'components' directory
    "./src/**/*.{js,ts,jsx,tsx}",        // Scan all files in the 'src' directory, if applicable
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}