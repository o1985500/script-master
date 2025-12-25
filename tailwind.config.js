/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f172a',      // พื้นหลังดำน้ำเงิน
        'dark-card': '#1e293b',    // สีการ์ด
        'dark-accent': '#334155',  // สีช่อง Input
        'brand-pink': '#ec4899',   // ชมพู
        'brand-purple': '#a855f7', // ม่วง
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}