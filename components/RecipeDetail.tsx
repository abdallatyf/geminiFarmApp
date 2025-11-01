
import React from 'react';
import { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onAddToShoppingList: (item: string) => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const VolumeUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 10a3 3 0 11-6 0 3 3 0 016 0zm-3 5a5 5 0 100-10 5 5 0 000 10zm11.147-3.853a.75.75 0 00-1.06 0L12 13.19l-2.088-2.088a.75.75 0 00-1.06 1.06L10.94 14.25l-2.087 2.088a.75.75 0 101.06 1.06L12 15.31l2.088 2.088a.75.75 0 101.06-1.06L13.06 14.25l2.088-2.088a.75.75 0 000-1.06z" />
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.824 5.37a6.5 6.5 0 119.352 9.257.75.75 0 00-1.1-1.026 5 5 0 10-7.153-7.205.75.75 0 00-1.1 1.026z" clipRule="evenodd" />
    </svg>
);

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, onAddToShoppingList }) => {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center mb-6 text-sm font-medium text-brand-primary hover:text-brand-dark transition-colors">
        <BackArrowIcon />
        Back to Recipes
      </button>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.name}</h1>
      <p className="text-gray-600 mb-6">{recipe.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-brand-light pb-2 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex items-center justify-between text-gray-700">
                <span>
                  <span className="font-medium">{ing.quantity}</span> {ing.name}
                  {ing.present && <span className="ml-2 text-xs font-semibold text-green-600">(In Fridge)</span>}
                </span>
                {!ing.present && (
                  <button onClick={() => onAddToShoppingList(`${ing.quantity} ${ing.name}`)} className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                    <PlusIcon />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-brand-light pb-2 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                <div className="flex-1">
                    <p className="text-gray-800 text-lg leading-relaxed">{step}</p>
                    <button onClick={() => speak(step)} className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-brand-primary transition-colors">
                        <VolumeUpIcon /> Read Aloud
                    </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
