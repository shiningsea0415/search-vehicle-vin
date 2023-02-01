const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
      "./app/**/*.tsx",
      "./app/**/*.jsx",
      "./app/**/*.js",
      "./app/**/*.ts"
    ],
    theme: {
      extend: {
        // colors: {},
        textColor: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          default: 'var(--color-text-default)',
          'default-soft': 'var(--color-text-default-soft)',
          inverse: 'var(--color-text-inverse)',
          'inverse-soft': 'var(--color-text-inverse-soft)',
        },
        backgroundColor: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          default: 'var(--color-bg-default)',
          inverse: 'var(--color-bg-inverse)',
        },
        fontFamily: {
          display: 'var(--font-display)',
          body: 'var(--font-body)',
        },
        fontWeights: {
          normal: 'var(--font-weight-normal)',
          display: 'var(--font-weight-display)',
          btn: 'var(--font-weight-btn)',
        },
        borderRadius: {
          none: '0',
          btn: 'var(--rounded-btn)',
        },
        fontFamily: {
            sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
        },
      }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
        require('daisyui')
    ]
};
