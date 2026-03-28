import { useState } from 'react';
import { products, type Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import SearchSection from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import ProductList from '../components/ProductList';
import '../styles/Catalog.css';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'flowers' | 'accessories'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, addToCart, removeFromCart } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <div className="catalog">
      <div className="catalog__header">
        <h1 className="catalog__title">Product Catalog</h1>
       </div>
      <SearchSection value={searchQuery} onChange={setSearchQuery} />
    
    

      <div className="catalog__filters">
        <FilterButton
          label="All"
          isActive={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        />
        <FilterButton
          label="Flowers"
          isActive={selectedCategory === 'flowers'}
          onClick={() => setSelectedCategory('flowers')}
        />
        <FilterButton
          label="Accessories"
          isActive={selectedCategory === 'accessories'}
          onClick={() => setSelectedCategory('accessories')}
        />
      </div>

      <ProductList
        products={filteredProducts}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
}