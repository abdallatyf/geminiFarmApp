
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Recipe, AppState, Tab } from './types';
import { DIETARY_RESTRICTIONS } from './constants';
import { generateRecipes, fileToGenerativePart } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import RecipeDetail from './components/RecipeDetail';
import ShoppingList from './components/ShoppingList';
import FilterSidebar from './components/FilterSidebar';
import RecipeList from './components/RecipeList';
import Tabs from './components/Tabs';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    image: null,
    recipes: [],
    filteredRecipes: [],
    selectedRecipe: null,
    shoppingList: [],
    activeFilters: [],
    isLoading: false,
    error: null,
    activeTab: 'recipes',
  });

  const {
    image,
    recipes,
    filteredRecipes,
    selectedRecipe,
    shoppingList,
    activeFilters,
    isLoading,
    error,
    activeTab,
  } = appState;

  const handleImageUpload = async (file: File) => {
    setAppState(prev => ({ ...prev, isLoading: true, error: null, image: file, recipes: [], filteredRecipes: [], selectedRecipe: null }));
    try {
      const generativePart = await fileToGenerativePart(file);
      const recipesData = await generateRecipes(generativePart, activeFilters);
      setAppState(prev => ({ ...prev, recipes: recipesData, filteredRecipes: recipesData, isLoading: false }));
    } catch (err) {
      console.error(err);
      setAppState(prev => ({ ...prev, error: 'Failed to generate recipes. Please try another image.', isLoading: false }));
    }
  };

  const handleFilterChange = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    setAppState(prev => ({ ...prev, activeFilters: newFilters }));
  };
  
  const refetchRecipesWithFilters = useCallback(async () => {
      if (!image) return;
      setAppState(prev => ({...prev, isLoading: true, error: null}));
      try {
          const generativePart = await fileToGenerativePart(image);
          const recipesData = await generateRecipes(generativePart, activeFilters);
          setAppState(prev => ({ ...prev, recipes: recipesData, filteredRecipes: recipesData, isLoading: false }));
      } catch (err) {
          console.error(err);
          setAppState(prev => ({ ...prev, error: 'Failed to re-fetch recipes with new filters.', isLoading: false }));
      }
  }, [image, activeFilters]);


  useEffect(() => {
    let filtered = [...recipes];
    if (activeFilters.length > 0) {
      filtered = recipes.filter(recipe =>
        activeFilters.every(filter => recipe.dietaryTags.includes(filter))
      );
    }
    setAppState(prev => ({ ...prev, filteredRecipes: filtered }));
  }, [recipes, activeFilters]);

  const addToShoppingList = (item: string) => {
    if (!shoppingList.includes(item)) {
      setAppState(prev => ({ ...prev, shoppingList: [...prev.shoppingList, item] }));
    }
  };
  
  const removeFromShoppingList = (item: string) => {
      setAppState(prev => ({...prev, shoppingList: prev.shoppingList.filter(i => i !== item)}));
  };

  const clearShoppingList = () => {
    setAppState(prev => ({...prev, shoppingList: []}));
  };

  const resetApp = () => {
    setAppState({
        image: null,
        recipes: [],
        filteredRecipes: [],
        selectedRecipe: null,
        shoppingList: [],
        activeFilters: [],
        isLoading: false,
        error: null,
        activeTab: 'recipes',
    });
  }

  const renderContent = () => {
    if (selectedRecipe) {
      return (
        <RecipeDetail
          recipe={selectedRecipe}
          onBack={() => setAppState(prev => ({ ...prev, selectedRecipe: null }))}
          onAddToShoppingList={addToShoppingList}
        />
      );
    }

    if (activeTab === 'shoppingList') {
        return <ShoppingList list={shoppingList} onRemove={removeFromShoppingList} onClear={clearShoppingList} />;
    }

    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <div className="text-center text-red-500 mt-8">{error}</div>;
    }

    if (image) {
      return (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <FilterSidebar
            filters={DIETARY_RESTRICTIONS}
            activeFilters={activeFilters}
            onChange={handleFilterChange}
            onApply={refetchRecipesWithFilters}
          />
          <RecipeList
            recipes={filteredRecipes}
            onSelectRecipe={recipe => setAppState(prev => ({ ...prev, selectedRecipe: recipe }))}
          />
        </div>
      );
    }
    
    return <ImageUploader onImageUpload={handleImageUpload} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header onLogoClick={resetApp}/>
      <main className="container mx-auto p-4 md:p-8">
        {image && !selectedRecipe && (
            <Tabs 
                activeTab={activeTab} 
                onTabChange={(tab: Tab) => setAppState(prev => ({ ...prev, activeTab: tab }))} 
            />
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
