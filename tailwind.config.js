/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class', // ← ეს ხაზი დაამატეთ
    theme: {
        extend: {
            animation: {
                'fadeInUp': 'fadeInUp 0.6s ease-out',
                'slideInRight': 'slideInRight 0.5s ease-out',
                'bounceIn': 'bounceIn 0.6s ease-out',
            }
        },
    },
    plugins: [],
}