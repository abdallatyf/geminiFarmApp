
import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-12">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
    <h3 className="mt-4 text-xl font-semibold text-gray-700">Crafting Your Recipes...</h3>
    <p className="text-gray-500">The AI chef is checking the fridge!</p>
  </div>
);

export default Spinner;
