/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0E11',
        card: '#11161D',
        border: '#1F2630',
        text: '#EAECEF',
        muted: '#9AA4B2',
        gold: '#D9A441',
        'gold-hi': '#F5D07A',
        up: '#0ECB81',
        down: '#F6465D',
        warn: '#F0B90B',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(217,164,65,.14) inset',
      },
      backgroundImage: {
        circuit: 'radial-gradient(circle at 20% 20%, rgba(217,164,65,.08), transparent 28%), linear-gradient(90deg, rgba(217,164,65,.05) 1px, transparent 1px), linear-gradient(rgba(217,164,65,.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        circuit: 'auto, 32px 32px, 32px 32px',
      },
    },
  },
  plugins: [],
};
