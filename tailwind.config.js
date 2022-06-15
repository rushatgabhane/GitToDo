/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                black: '#292a30',
                blue: '#00a2ff',
                purple: '#e366d6',
                pink: '##ff6fb3',
                orange: '#ff5d54',
                yellow: '#ffc18f',
                green: '#6dc9ba',
                white: '#fcfcfc',
            },
            fontFamily: {
                sans: ['Archivo', 'Helvetica', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
