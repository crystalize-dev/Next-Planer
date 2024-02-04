/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                main: 'var(--main)',
                mainDarker: 'var(--main-darker)',
                mainLighter: 'var(--main-lighter)',
                border: 'rgba(0,0,0,0.1)',
                modal: 'rgba(0,0,0,0.5)'
            },
            width: {
                aside: 'var(--aside-width)'
            },
            minWidth: {
                aside: 'var(--min-aside-width)'
            },
            boxShadow: {
                around: '0 0 2px 2px rgba(0, 0, 0, 0.1)'
            }
        }
    },
    plugins: ['prettier-plugin-tailwindcss']
};
