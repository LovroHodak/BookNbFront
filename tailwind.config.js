module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '900': '#043e5f',
          '800': '#05496f',
          '700': '#06537f',
          '600': '#065e8f',
          '500': '#07689F',
          '400': '#087ec0',
          '300': '#0a93e1',
          '200': '#18a5f5',
          '100': '#39b2f6',
        },
        secondary: {
          '900': '#1e92d5',
          '800': '#38a5e3',
          '700': '#5bb5e8',
          '600': '#7fc5ed',
          '500': '#A2D5F2',
          '400': '#abd9f3',
          '300': '#b5ddf5',
          '200': '#bee2f6',
          '100': '#c7e6f7',
          '50': '#d0eaf8'
        },
        accent: {
          '900': '#4d0c00',
          '800': '#801300',
          '700': '#b31b00',
          '600': '#e62300',
          '500': '#ff3c1a',
          '400': '#ff684d',
          '300': '#ff9380',
          '200': '#ffbeb3',
          '100': '#ffe9e5',
        }
      }
    },
  },
  plugins: [],
}


// normal tailwind just to be able to use their classes