import React, { useEffect, useState } from 'react';
import Section from './Section';

interface Product {
  id: number;
  title: string;
  price: number;
  weight: number;
  image: string;
}

interface Products {
  healthyOptions: Product[];
  chips: Product[];
  drinks: Product[];
}

interface ProductSectionsProps {
  addToCart: (product: Product) => void;
}

const ProductSections: React.FC<ProductSectionsProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Products>({
    healthyOptions: [],
    chips: [],
    drinks: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('./products.json'); 
        const data = await response.json();
        setProducts({
          healthyOptions: data.healthyOptions || [],
          chips: data.chips || [],
          drinks: data.drinks || []
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex-1 container mx-auto py-12 px-4 space-y-16 bg-gradient-to-b from-blue-50 to-indigo-100">
      <Section title="Healthy Options" items={products.healthyOptions} onAddToCart={addToCart} />
      <Section title="Chips" items={products.chips} onAddToCart={addToCart} />
      <Section title="Drinks" items={products.drinks} onAddToCart={addToCart} />
    </main>
  );
};

export default ProductSections;