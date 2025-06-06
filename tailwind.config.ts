import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-datepicker/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ela-sans': ['"Ela Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'arioso': ['"Arioso"', 'serif'],
        'berling-nova': ['"Berling Nova Sans W04 Regular"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'calluna': ['"Calluna"', 'serif'],
      },
      colors: {
        'deep-green': '#5B6E5F',
        'off-white': '#F0EDE9',
        'terracotta': '#FFA07A',
        'custom-black': '#000000',
        'baby-blue': '#7A9EAB',
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'gentle-float': 'float 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-out': 'fadeOut 5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.8s ease-out forwards',
        'pulse': 'pulse 1s ease-in-out',
      },
      
      keyframes: {
        fadeInBounce: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '20%': { opacity: '1', transform: 'translateY(0)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-20px)' },
          '80%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,255,255,0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0,255,255,0.9)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
        '6000': '6000ms',
        '7000': '7000ms',
        '8000': '8000ms',
        '9000': '9000ms',
      },
    },
  },
  plugins: [],
};

export default config;
