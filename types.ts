
export interface Ingredient {
  name: string;
  quantity: string;
  present: boolean;
}

export interface Recipe {
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
  calories: number;
  ingredients: Ingredient[];
  steps: string[];
  dietaryTags: string[];
}

export type Tab = 'recipes' | 'shoppingList';

export interface AppState {
  image: File | null;
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  selectedRecipe: Recipe | null;
  shoppingList: string[];
  activeFilters: string[];
  isLoading: boolean;
  error: string | null;
  activeTab: Tab;
}
