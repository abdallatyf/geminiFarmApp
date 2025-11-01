
import React from 'react';

interface FilterSidebarProps {
  filters: string[];
  activeFilters: string[];
  onChange: (filter: string) => void;
  onApply: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, activeFilters, onChange, onApply }) => {
  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Dietary Filters</h3>
        <div className="space-y-3">
          {filters.map(filter => (
            <label key={filter} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.includes(filter)}
                onChange={() => onChange(filter)}
                className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-secondary"
              />
              <span className="text-gray-700">{filter}</span>
            </label>
          ))}
        </div>
        <button 
            onClick={onApply}
            className="mt-6 w-full bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
        >
            Apply Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
