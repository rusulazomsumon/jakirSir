/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      mobile: '0px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1440px'
    },
    extend: {
      colors: {
        primary: '#2563EB',
        primaryDark: '#1D4ED8',
        accent: '#FACC15',
        success: '#22C55E',
        danger: '#EF4444',
        background: '#F8FAFC',
        card: '#FFFFFF',
        border: '#E2E8F0',
        textPrimary: '#0F172A',
        textSecondary: '#64748B'
      },
      boxShadow: {
        card: '0 8px 20px rgba(0,0,0,0.06)',
        floating: '0 15px 30px rgba(0,0,0,0.12)',
        hover: '0 20px 40px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px'
      },
      spacing: {
        2: '8px',
        4: '16px',
        5: '20px',
        6: '24px'
      },
      minHeight: {
        touch: '48px'
      },
      minWidth: {
        touch: '48px'
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'Noto Sans Bengali', 'sans-serif']
      }
    }
  },
  plugins: []
}

