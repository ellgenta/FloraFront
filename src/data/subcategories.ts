export const SUBCATEGORIES: Record<string, { value: string; label: string }[]> = {
  plants: [
    { value: 'decorative-foliage', label: 'Decorative Foliage' },
    { value: 'flowering',          label: 'Flowering Plants' },
    { value: 'succulents',         label: 'Succulents' },
    { value: 'palms-trees',        label: 'Palms & Trees' },
  ],
  pots: [
    { value: 'ceramic',  label: 'Ceramic' },
    { value: 'plastic',  label: 'Plastic' },
  ],
  fertilizers: [
    { value: 'mineral', label: 'Mineral' },
    { value: 'organic', label: 'Organic' },
  ],
  tools: [
    { value: 'planting', label: 'For Planting' },
    { value: 'watering', label: 'For Watering' },
  ],
};

export function getSubcategoryLabel(subcategoryValue: string): string {
  for (const subs of Object.values(SUBCATEGORIES)) {
    const match = subs.find(s => s.value === subcategoryValue);
    if (match) return match.label;
  }
  return subcategoryValue;
}