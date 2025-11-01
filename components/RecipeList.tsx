
import React from 'react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => {
  if (recipes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        <h3 className="text-xl font-semibold text-gray-700">No Recipes Found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or uploading a different photo.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard key={`${recipe.name}-${index}`} recipe={recipe} onSelect={() => onSelectRecipe(recipe)} />
      ))}
    </div>
  );
};

export default RecipeList;
