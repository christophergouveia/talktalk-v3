import { heroui } from "@heroui/react";
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        scaleIn: 'scaleIn 0.2s ease-out',
        slideInRight: 'slideInRight 0.3s ease-out',
        pulse: 'pulse 2s ease-in-out infinite',
        bounce: 'bounce 1s infinite'
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui(), 
    require('@codaworks/react-glow/tailwind')
  ],
} as Config;

export default config;
