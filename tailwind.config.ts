import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./animation/**/*.{js,ts,jsx,tsx,mdx}",
        "./public/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "3rem",
                xl: "7rem",
                "2xl": "8rem",
            },
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            backgroundImage: {},
            gridTemplateColumns: {},
            fontFamily: {
                bebas: ["Bebas Neue", "sans-serif"],
            },
            inset: {},
            padding: {},
            height: {},
            margin: {},
            borderRadius: {},
            fontSize: {
                sm: "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
                base: "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
                lg: "clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)",
                label: "clamp(1rem, 1vw + 1.31rem, 1.2rem)",
                "sub-title": "clamp(1rem, 1.56vw + 1.56rem, 1.25rem)",
                title: "clamp(2.44rem, 2.38vw + 1.85rem, 2.8rem)",
                features: "clamp(3.05rem, 3.54vw + 2.17rem, 5rem)",
                section: "clamp(2.44rem, 2.38vw + 1.85rem, 2.8rem)",
                hero: "clamp(4.77rem, 7.48vw + 2.9rem, 6rem)",
            },
            colors: {
                primary: {
                    "50": "#fcfee8",
                    "100": "#f9ffc2",
                    "200": "#f6ff87",
                    "300": "#f9ff43",
                    "400": "#fffa04",
                    "500": "#efe103",
                    "600": "#ceb100",
                    "700": "#a48004",
                    "800": "#88640b",
                    "900": "#735110",
                    "950": "#432b05",
                },
                secondary: {
                    '50': '#f1fce9',
                    '100': '#e1f9ce',
                    '200': '#c4f2a4',
                    '300': '#9ee86e',
                    '400': '#7cd942',
                    '500': '#5cbf23',
                    '600': '#459818',
                    '700': '#367417',
                    '800': '#2e5c18',
                    '900': '#294f18',
                    '950': '#143109',
                },
                neutral: {
                    '50': '#f1fce9',
                    '100': '#e1f9ce',
                    '200': '#c4f2a4',
                    '300': '#9ee86e',
                    '400': '#7cd942',
                    '500': '#5cbf23',
                    '600': '#459818',
                    '700': '#367417',
                    '800': '#2e5c18',
                    '900': '#294f18',
                    '950': '#143109',
                },
                beige: {
                    primary: "#FFF7ED",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            width: {},
            gap: {},
        },
    },
    plugins: [],
};
export default config;
