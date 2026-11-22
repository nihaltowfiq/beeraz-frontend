export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  color: string;
  rating: number;
}

export const products: Product[] = [
  { id: 'headphones', name: 'Wireless Headphones', description: 'Noise-cancelling over-ear headphones with 30h battery life.', price: 199.99, category: 'Audio', emoji: '🎧', color: '#e0e7ff', rating: 4.7 },
  { id: 'keyboard', name: 'Mechanical Keyboard', description: 'Hot-swappable 75% keyboard with tactile switches.', price: 129.0, category: 'Accessories', emoji: '⌨️', color: '#fce7f3', rating: 4.8 },
  { id: 'watch', name: 'Smart Watch', description: 'Fitness tracking, heart-rate monitor and 7-day battery.', price: 249.5, category: 'Wearables', emoji: '⌚', color: '#dcfce7', rating: 4.5 },
  { id: 'camera', name: 'Mirrorless Camera', description: '24MP sensor, 4K video and in-body stabilisation.', price: 899.0, category: 'Photo', emoji: '📷', color: '#fef3c7', rating: 4.9 },
  { id: 'speaker', name: 'Bluetooth Speaker', description: 'Waterproof portable speaker with deep bass.', price: 79.99, category: 'Audio', emoji: '🔊', color: '#cffafe', rating: 4.4 },
  { id: 'laptop', name: 'Ultrabook Laptop', description: '14" OLED display, 16GB RAM, 1TB SSD.', price: 1499.0, category: 'Computers', emoji: '💻', color: '#ede9fe', rating: 4.6 },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
