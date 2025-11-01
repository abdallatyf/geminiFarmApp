
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM10 18a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 10a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 017 10z" />
     <path d="M10 3.5a6.5 6.5 0 105.196 10.396A1.5 1.5 0 0015.5 14.5a1.5 1.5 0 00-1.5-1.5 1.5 1.5 0 00-1.06.44L10 11.879l-2.94-2.94a1.5 1.5 0 00-2.12 0 1.5 1.5 0 000 2.12L7.879 14l-2.44 2.44a1.5 1.5 0 002.12 2.12L10 16.121l2.44 2.44a1.5 1.5 0 002.12-2.12L12.121 14l2.94-2.94a1.5 1.5 0 000-2.12 1.5 1.5 0 00-2.12 0L10 11.879z" clipRule="evenodd" />
     <path d="M10 2a8 8 0 105.657 13.657A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
     <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.234 5.234a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061L5.234 6.295a.75.75 0 010-1.06zm9.532 0a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.061-1.06L14.766 5.234a.75.75 0 011.06 0zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
     <path d="M12.935 15.656a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 101.06 1.06l1.06-1.06zM7.126 14.596a.75.75 0 10-1.06 1.06l1.06 1.06a.75.75 0 101.06-1.06l-1.06-1.06z" clipRule="evenodd" />
     <path fillRule="evenodd" d="M3.5 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm11.25.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5z" clipRule="evenodd" />
  </svg>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
    </svg>
);


const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch(difficulty) {
        case 'Easy': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Hard': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => (
  <div
    onClick={onSelect}
    className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
  >
    <img src={`https://picsum.photos/seed/${recipe.name}/400/200`} alt={recipe.name} className="w-full h-40 object-cover" />
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{recipe.name}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{recipe.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-700 mt-auto">
        <div className="flex items-center">
          <ClockIcon />
          <span>{recipe.prepTime}</span>
        </div>
        <div className="flex items-center">
          <FireIcon />
          <span>{recipe.calories} kcal</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
        </span>
      </div>
    </div>
  </div>
);

export default RecipeCard;
