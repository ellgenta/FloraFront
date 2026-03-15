export interface Product {
  id: string;
  name: string;
  category: 'flowers' | 'accessories';
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 'rose-bouquet',
    name: 'Elegant Rose Bouquet',
    category: 'flowers',
    price: 45.99,
    image: '/flower.png',
    description: 'A beautiful arrangement of fresh red roses'
  },
  {
    id: 'tulip-mix',
    name: 'Spring Tulip Mix',
    category: 'flowers',
    price: 32.50,
    image: '/flower.png',
    description: 'Colorful mix of seasonal tulips'
  },
  {
    id: 'orchid-pot',
    name: 'Mini Orchid Plant',
    category: 'flowers',
    price: 28.99,
    image: '/flower.png',
    description: 'Elegant orchid in a decorative pot'
  },
  {
    id: 'sunflower-bunch',
    name: 'Sunflower Bunch',
    category: 'flowers',
    price: 25.99,
    image: '/flower.png',
    description: 'Bright and cheerful sunflowers'
  },
  {
    id: 'lily-arrangement',
    name: 'Lily Arrangement',
    category: 'flowers',
    price: 38.99,
    image: '/flower.png',
    description: 'Elegant white lilies in a glass vase'
  },
  {
    id: 'flower-pot',
    name: 'Ceramic Flower Pot',
    category: 'accessories',
    price: 18.99,
    image: '/flower.png',
    description: 'Handcrafted ceramic pot for your plants'
  },
  {
    id: 'watering-can',
    name: 'Vintage Watering Can',
    category: 'accessories',
    price: 24.50,
    image: '/flower.png',
    description: 'Classic metal watering can with long spout'
  },
  {
    id: 'plant-stand',
    name: 'Wooden Plant Stand',
    category: 'accessories',
    price: 39.99,
    image: '/flower.png',
    description: 'Rustic wooden stand for your favorite plants'
  },
  {
    id: 'flower-shears',
    name: 'Professional Flower Shears',
    category: 'accessories',
    price: 15.99,
    image: '/flower.png',
    description: 'Sharp shears for precise flower cutting'
  },
  {
    id: 'plant-mister',
    name: 'Plant Mister Bottle',
    category: 'accessories',
    price: 12.99,
    image: '/flower.png',
    description: 'Fine mist sprayer for plant care'
  }
];