import React, { useEffect, useState, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Product {
  title: string;
  price: number;
  allergens: string;
  image: string;
}

interface SectionProps {
  title: string;
  items: Product[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);

  useEffect(() => {
    const currentScrollRef = scrollRef.current;

    const handleScroll = () => {
      if (currentScrollRef) {
        // Determine whether to show chevrons based on scroll position
        setShowLeftChevron(currentScrollRef.scrollLeft > 0);
        setShowRightChevron(currentScrollRef.scrollWidth > currentScrollRef.clientWidth + currentScrollRef.scrollLeft);
      }
    };

    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll);
      // Initial check for chevrons
      handleScroll();
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [items]);

  return (
    <section className="relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div ref={scrollRef} className="scrollable-container flex overflow-x-auto space-x-4 pb-4">
        {items.map((product, index) => (
          <div key={index} className="flex-none w-48 md:w-64 group relative">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3 overflow-hidden relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              {/* Add to cart button */}
            </div>
            <div className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{product.title}</div>
            <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Allergens: {product.allergens}</div>
          </div>
        ))}
      </div>

      {showLeftChevron && (
        <button className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full shadow-md hover:bg-gray-100">
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {showRightChevron && (
        <button className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full shadow-md hover:bg-gray-100">
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </section>
  );
};

export default Section;
