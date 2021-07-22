const { colors: defaultColors } = require('tailwindcss/defaultTheme')


module.exports = {
  purge: {
    content:['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options:{
      safelist:["text-codot-blue", "text-pink", "text-codot-green", "text-gray-300", "text-codot-green-light"]
    },
  },

  darkMode: false, // or 'media' or 'class'

  theme: {

    extend: {

      keyframes: {
        "widener":{
          "0%": { width: "0%"},
          "100%": { width: "100%"}
        },

        "fade-in":{
          from:{ opacity: "0" },
          to:{ opacity:"1"}
        }

      },

      animation:{
        "widener-5": "widener 5s",
        "fade-in":"fade-in 1s"
      }

    },
    colors:{
      ...defaultColors,
      purple:"#6C5CE7",
      "purple-dark":"#100DC9",
      "yellow-dark":"#FDCB6E",
      "fuschia":"#FCDDEC",
      "purple-light":"#A29BFE",
      "codot-blue":"#148BFF",
      "codot-green":"#00B894",
      "codot-green-light":"#55EFC4",
      "pink":"#E84393",
      "orange":"#FF7675",
    },
    fontFamily:{
      'inter':['inter']
    }

  },

  variants: {
    extend: {},
  },

  plugins: [],
}
