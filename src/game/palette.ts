// Pastel palette for region cells. Picked to feel cozy and high-contrast against the dark cat icon.
export const REGION_COLORS = [
  '#ffd6df', // pink
  '#ffe7b4', // butter
  '#cfead7', // sage
  '#cfe6f5', // sky
  '#e5d6f6', // lavender
  '#ffd8b4', // peach
  '#d8f0e3', // mint
  '#fadcd0', // coral
  '#e0e9b6', // chartreuse
  '#f1d4ea', // mallow
  '#cdded4', // eucalyptus
  '#f7e1be', // honey
]

export function regionColor(id: number): string {
  return REGION_COLORS[id % REGION_COLORS.length]
}
