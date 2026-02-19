/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: '#0F0529',
                neonCyan: '#00E5FF',
                neonMagenta: '#D900C5',
                glass: 'rgba(255, 255, 255, 0.05)',
                glassBorder: 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 10s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scroll': 'scroll 20s linear infinite',
                'shine': 'shine 1.5s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                shine: {
                    '0%': { transform: 'translateX(-150%) skewX(-12deg)' },
                    '100%': { transform: 'translateX(150%) skewX(-12deg)' },
                }
            }
        },
    },
    plugins: [],
}
