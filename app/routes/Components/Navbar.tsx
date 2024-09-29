import React from 'react';
import { MapPin, Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Assuming you have a UI input component.
import CartComponent from "./ShoppingCart"; // Adjust the import path as needed

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  filteredSuggestions: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (suggestion: string) => void;

  inputSearchValue: string;
  setInputSearchValue: React.Dispatch<React.SetStateAction<string>>;
  filteredSearchSuggestions: string[];
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSuggestionClick: (searchSuggestion: string) => void;

  cartItems: { id: number; name: string; quantity: number; price: number; weight: number }[];
  updateQuantity: (id: number, change: number) => void;
  cartVisible: boolean;
  setCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  inputValue,
  filteredSuggestions,
  handleInputChange,
  handleSuggestionClick,
  inputSearchValue,
  filteredSearchSuggestions,
  handleSearchInputChange,
  handleSearchSuggestionClick,
  cartItems,
  updateQuantity,
  cartVisible,
  setCartVisible,
}) => {
  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-indigo-800 border-2 border-indigo-600 px-2 rounded">logo</div>
            <div className="relative hidden sm:block">
              <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="text"
                placeholder="Enter location. ex:CRX210"
                value={inputValue}
                onChange={handleInputChange}
                className="pl-8 pr-4 py-2 w-48 text-sm bg-white border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
          </div>

          <div className="hidden md:block flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={inputSearchValue}
                onChange={handleSearchInputChange}
                className="pl-10 pr-4 py-2 w-full bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-indigo-800 placeholder-indigo-300"
              />
              {filteredSearchSuggestions.length > 0 && (
                <ul className="absolute left-0 z-10 w-full bg-white border border-indigo-200 rounded-md shadow-lg">
                  {filteredSearchSuggestions.map((searchSuggestion, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleSearchSuggestionClick(searchSuggestion)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            handleSearchSuggestionClick(searchSuggestion);
                          }
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-indigo-700 cursor-pointer"
                      >
                        {searchSuggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center relative">
            <Button variant="ghost" size="icon" className="text-indigo-600 hover:bg-indigo-100">
                <User className="h-6 w-6 mr-2" />
                Hi! User
            </Button>
            <Button variant="ghost" size="icon" className="mr-2 text-indigo-600 hover:bg-indigo-100" onClick={toggleCart}>
              <ShoppingCart className="h-6 w-6" />
              {/* Circle with item count */}
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {/* Total quantity */}
                </span>
              )}
            </Button>

          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-indigo-600 hover:bg-indigo-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={inputValue}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 w-full bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-indigo-800 placeholder-indigo-300"
              />
              {filteredSuggestions.length > 0 && (
                <ul className="absolute left-0 z-10 w-full bg-white border border-indigo-200 rounded-md shadow-lg">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleSuggestionClick(suggestion)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            handleSuggestionClick(suggestion);
                          }
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-indigo-700 cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-around">
              <Button variant="ghost" size="icon" className="text-indigo-600 hover:bg-indigo-100" onClick={toggleCart}>
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {/* Total quantity */}
                  </span>
                )}
              </Button> 
              <Button variant="ghost" size="icon" className="text-indigo-600 hover:bg-indigo-100">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <CartComponent 
        visible={cartVisible} 
        onClose={() => setCartVisible(false)} 
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />
    </header>
  );
};

export default Navbar;