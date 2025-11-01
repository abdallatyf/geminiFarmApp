
import React from 'react';

interface ShoppingListProps {
  list: string[];
  onRemove: (item: string) => void;
  onClear: () => void;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


const ShoppingList: React.FC<ShoppingListProps> = ({ list, onRemove, onClear }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Shopping List</h2>
        {list.length > 0 && (
            <button
              onClick={onClear}
              className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
        )}
      </div>
      {list.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your shopping list is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {list.map((item, index) => (
            <li key={index} className="flex items-center justify-between py-3">
              <span className="text-gray-700">{item}</span>
              <button onClick={() => onRemove(item)} className="text-gray-400 hover:text-red-500 transition-colors">
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;
