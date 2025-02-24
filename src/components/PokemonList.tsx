import { useMemo } from 'react';
import { usePokeStore } from '../store/pokeStore.ts';
import PokemonCard from './PokemonCard.tsx';
import { Pokemon } from '../types/pokemon.ts';

interface PokemonListProps {
    searchTerm: string;
    onSelectPokemon: (pokemon: Pokemon) => void;
}

function PokemonList({ searchTerm, onSelectPokemon }: PokemonListProps) {
    const { searchPokemons } = usePokeStore();

    // Utiliser la fonction searchPokemons du store
    const filteredPokemons = useMemo(() => {
        return searchPokemons(searchTerm);
    }, [searchPokemons, searchTerm]);

    return (
        <div className="mt-6">
            {filteredPokemons.length === 0 ? (
                <p className="text-center text-gray-500">Aucun Pokémon trouvé.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredPokemons.map(pokemon => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            onClick={onSelectPokemon}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PokemonList;
