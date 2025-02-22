import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

// A custom function to flatten a nested object (colors in this case)
function flattenColors(obj: Record<string, any>, prefix = ""): Record<string, string> {
  let result: Record<string, string> = {};
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}-${key}` : key;
    if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenColors(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = theme("colors");
  const flattenedColors = flattenColors(allColors);
  const newVars = Object.fromEntries(
    Object.entries(flattenedColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({
    ":root": newVars,
  });
}

const config: Config = {
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;