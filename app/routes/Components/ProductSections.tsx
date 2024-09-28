import React, { useEffect, useState } from 'react';
import Section from './Section';

// Define the Product interface
interface Product {
  title: string;
  price: number;
  allergens: string;
  image: string;
}

// Define the Products interface to hold all sections
interface Products {
  recommendations: Product[];
  chips: Product[];
  drinks: Product[];
}

const ProductSections: React.FC = () => {
  const [products, setProducts] = useState<Products>({ recommendations: [], chips: [], drinks: [] });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./products.json'); 
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex-1 container mx-auto py-8 px-4 space-y-12">
      <Section title="Recommendations" items={products.recommendations} />
      <Section title="Chips" items={products.chips} />
      <Section title="Drinks" items={products.drinks} />
    </main>
  );
};

export default ProductSections;
