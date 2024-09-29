import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Notifications from "./Components/Notifications";
import ProductSections from "./Components/ProductSections";
import ProfileCard from "./Components/ProfileCard";
import OrderHistory from "./Components/OrderHistory";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  weight: number;
}

export default function Component() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('/suggestions.json');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSuggestions(data);
        console.log("Available Suggestions:", data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    console.log("Input Value:", value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      console.log("Filtered Suggestions:", filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    console.log("Selected Suggestion:", suggestion);
  };

  
  const addToCart = (product: { id: number; title: string; price: number; weight: number }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, name: product.title, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        inputValue={inputValue}
        setInputValue={setInputValue}
        filteredSuggestions={filteredSuggestions}
        handleInputChange={handleInputChange}
        handleSuggestionClick={handleSuggestionClick}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        cartVisible={cartVisible}
        setCartVisible={setCartVisible}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        <Notifications /> 
        <ProductSections addToCart={addToCart} />
      </main>

      <div id="footer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-3xl font-bold mb-4 text-indigo-800">User Dashboard</h1>
        <ProfileCard />
        {/* <h2 className="text-3xl font-bold mb-4 mt-8 text-indigo-800">Order History</h2>
        <OrderHistory /> */}
      </div>
    </div>
  );
}