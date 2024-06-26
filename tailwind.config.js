/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', '*.{html,js}'],
  theme: {
    extend: {
      colors: {
        "connections-purple": "#B3A7FE",
        "strands": "#C0DDD9",
      },
      fontFamily: {
        header: ["Abril Fatface", "serif"]
      },
      
    },
  },
  plugins: [],
}

