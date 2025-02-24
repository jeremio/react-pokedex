import React, { useState, useCallback } from 'react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
    const [inputValue, setInputValue] = useState(searchTerm);

    // Utiliser debounce pour éviter trop de re-renders
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Debounce pour la recherche
        const timeoutId = setTimeout(() => {
            setSearchTerm(value);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [setSearchTerm]);

    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <input
                type="search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500 outline-none"
                placeholder="Rechercher par nom, numéro ou type..."
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;
