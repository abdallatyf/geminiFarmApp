
import React from 'react';
import { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const getTabClasses = (tabName: Tab) => {
    return activeTab === tabName
      ? 'border-brand-primary text-brand-primary'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  };

  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          onClick={() => onTabChange('recipes')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${getTabClasses('recipes')}`}
        >
          Recipes
        </button>
        <button
          onClick={() => onTabChange('shoppingList')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${getTabClasses('shoppingList')}`}
        >
          Shopping List
        </button>
      </nav>
    </div>
  );
};

export default Tabs;
