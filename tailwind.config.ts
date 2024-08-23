import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2BD17E",
        secondary: "#EB5757",
        base: "#093545",
        neutral: "#224957",
        accent: "#092C39",
      },
      spacing: {
        "1": "2px",
        "2": "4px",
        "3": "8px",
        "4": "12px",
        "5": "16px",
        "6": "24px",
        "7": "32px",
        "8": "40px",
        "9": "48px",
        "10": "64px",
        "11": "80px",
        "12": "120px",
        "13": "160px",
      },
      fontSize: {
        caption: ["14px", { lineHeight: "16px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "24px" }],
        md: ["16px", { lineHeight: "24px" }],
        lg: ["20px", { lineHeight: "32px" }],
        xl: ["16px", { lineHeight: "24px" }],
        "2xl": ["20px", { lineHeight: "24px" }],
        "3xl": ["24px", { lineHeight: "32px" }],
        "4xl": ["32px", { lineHeight: "40px" }],
        "5xl": ["48px", { lineHeight: "56px" }],
        "6xl": ["64px", { lineHeight: "80px" }],
      },
      fontFamily: {
        montserrat: "var(--montserrat)",
        poppins: "var(--poppins)",
      },
    },
  },
  plugins: [],
};
export default config;
