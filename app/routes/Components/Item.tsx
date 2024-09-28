import React from 'react';

interface ItemProps {
  title: string;
  image: string;
  weight: string;
  timeOfOrder?: string; // Optional: Time of order, used only for shopped items
  onAdd: () => void;
  onRemove: () => void;
}

const Item: React.FC<ItemProps> = ({ title, image, weight, timeOfOrder, onAdd, onRemove }) => {
  return (
    <div className="border rounded-lg p-4 max-w-xs text-center shadow-lg">
      <img src={image} alt={title} className="w-full h-auto rounded-md" />
      <h2 className="text-xl font-semibold my-2">{title}</h2>
      <p className="text-gray-500">Weight: {weight}</p>
      {timeOfOrder && <p className="text-gray-400">Ordered: {timeOfOrder}</p>} {/* Conditionally render time of order */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add
        </button>
        <button
          onClick={onRemove}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Item;
