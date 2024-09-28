import React, { useState } from 'react';
import { MapPin, Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CartComponent from "./ShoppingCart"; // Adjust the import path as needed

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  filteredSuggestions: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (suggestion: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  inputValue,
  filteredSuggestions,
  handleInputChange,
  handleSuggestionClick,
}) => {
  const [cartVisible, setCartVisible] = useState(false); // State to manage cart visibility

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold border-2 border-black px-2">logo</div>
            <div className="relative hidden sm:block">
              <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Enter your location, ex: CRX210"
                value={inputValue}
                onChange={handleInputChange}
                className="pl-8 pr-4 py-2 w-48 text-sm bg-gray-100 rounded-md"
              />
              {filteredSuggestions.length > 0 && (
                <ul className="absolute left-0 z-10 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleSuggestionClick(suggestion)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            handleSuggestionClick(suggestion);
                          }
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="hidden md:block flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input type="text" placeholder="Search here..." className="pl-10 pr-4 py-2 w-full" />
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={toggleCart}>
              <ShoppingCart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <a href="#footer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <User className="h-6 w-6" />
                Hi! User
              </a>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {mobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input type="text" placeholder="Search here..." className="pl-10 pr-4 py-2 w-full" />
            </div>
            <div className="flex justify-around">
              <Button variant="ghost" size="icon" onClick={toggleCart}>
                <ShoppingCart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Render the CartComponent here */}
      <CartComponent visible={cartVisible} onClose={() => setCartVisible(false)} />
    </header>
  );
};

export default Navbar;
