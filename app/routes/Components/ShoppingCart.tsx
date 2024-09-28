import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

interface ShoppingCartProps {
  visible: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ visible, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Product Name", quantity: 1 },
    { id: 2, name: "Another Product", quantity: 2 },
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <Button className="absolute top-2 right-2" variant="ghost" onClick={onClose}>
          &times;
        </Button>
        <h2 className="text-xl font-bold mb-4">Items in Cart</h2>
        <p className="text-sm text-gray-600 mb-4">Total of items: {totalItems}</p>
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 mr-3 flex items-center justify-center">
                X
              </div>
              <span>{item.name}</span>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(item.id, -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(item.id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button className="w-full mt-4" onClick={onClose}>Order</Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
