import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from "./ui/button";
import { Minus, Plus, ShoppingCart as CartIcon, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  weight: number;
}

interface ShoppingCartProps {
  visible: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, change: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ visible, onClose, cartItems, updateQuantity }) => {
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = cartItems.reduce((sum, item) => sum + item.weight * item.quantity, 0);

  const isOverWeightLimit = totalWeight > 500;

  const handlePlaceOrder = () => {
    if (isOverWeightLimit) {
      alert("Error: Total weight exceeds 500g limit!");
    } else {
      console.log("Placing order");
      navigate('/rover');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <Card className="w-96 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-b-[40px]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Shopping Cart</CardTitle>
            <div className="h-16 w-16 bg-white rounded-full p-1 shadow-md">
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-300 rounded-full">
                <CartIcon className="h-8 w-8 text-indigo-700" />
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 pt-8">
          <p className="text-sm text-gray-600 mb-4">Total items: {totalItems}</p>
          <p className={`text-sm ${isOverWeightLimit ? 'text-red-600 font-bold' : 'text-gray-600'} mb-4`}>
            Total weight: {totalWeight}g {isOverWeightLimit && '(Exceeds 500g limit!)'}
          </p>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg mr-3 flex items-center justify-center text-indigo-500 font-bold">
                    {item.name[0]}
                  </div>
                  <span className="text-gray-800">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-indigo-300 text-indigo-500"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2 w-8 text-center text-gray-800">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-indigo-300 text-indigo-500"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <Button 
              className={`w-full mt-6 ${
                isOverWeightLimit 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700'
              } text-white transition-all duration-300`}
              onClick={handlePlaceOrder}
              disabled={isOverWeightLimit}
            >
              Place Order
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;