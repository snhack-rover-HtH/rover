import React, { useEffect, useState, useRef } from "react";
import { ChevronRight, ChevronLeft, ShoppingCart, Check } from "lucide-react";
import { Button } from "./ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
  weight: number;
  image: string;
}

interface SectionProps {
  title: string;
  items: Product[];
  onAddToCart: (product: Product) => void;
}

const Section: React.FC<SectionProps> = ({ title, items, onAddToCart }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);
  const [addedItems, setAddedItems] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const currentScrollRef = scrollRef.current;

    const handleScroll = () => {
      if (currentScrollRef) {
        setShowLeftChevron(currentScrollRef.scrollLeft > 0);
        setShowRightChevron(currentScrollRef.scrollWidth > currentScrollRef.clientWidth + currentScrollRef.scrollLeft);
      }
    };

    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth;
      current.scrollTo({
        left: current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section className="relative bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-800">{title}</h2>
      <div ref={scrollRef} className="scrollable-container flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {items.map((product) => (
          <div key={product.id} className="flex-none w-48 md:w-64 group relative">
            <div className="aspect-video bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg mb-3 overflow-hidden relative shadow-sm">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <Button 
                className={`absolute bottom-2 right-2 ${
                  addedItems[product.id] 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white transition-all duration-300`}
                onClick={() => handleAddToCart(product)}
              >
                {addedItems[product.id] ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                {addedItems[product.id] ? 'Added' : 'Add'}
              </Button>
            </div>
            <div className="text-base md:text-lg font-semibold text-indigo-700 group-hover:text-indigo-600 transition-colors">{product.title}</div>
            <div className="text-xs text-indigo-500 mt-1">Weight: {product.weight}g</div>
          </div>
        ))}
      </div>

      {showLeftChevron && (
        <button 
          onClick={() => scroll('left')}
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full shadow-md hover:bg-indigo-100 transition-colors p-2 text-indigo-600"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {showRightChevron && (
        <button 
          onClick={() => scroll('right')}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full shadow-md hover:bg-indigo-100 transition-colors p-2 text-indigo-600"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </section>
  );
};

export default Section;