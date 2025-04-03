import withMT  from "@material-tailwind/react/utils/withMT"

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{html,js,jsx,tsx,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
