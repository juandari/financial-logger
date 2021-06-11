module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      mono: ['DM Mono', 'monospace'],
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
