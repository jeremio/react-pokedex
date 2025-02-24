import { memo } from 'react';
import { Pokemon } from '../types/pokemon.ts';

interface TypeColors {
    [key: string]: string;
}

const typeColors: TypeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-600',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
};

interface PokemonCardProps {
    pokemon: Pokemon;
    onClick: (pokemon: Pokemon) => void;
}

const PokemonCard = memo(function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
    return (
        <div
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform"
            onClick={() => onClick(pokemon)}
        >
            <div className="flex flex-col items-center">
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-32 h-32 object-contain"
                />

                <h2 className="text-xl font-semibold capitalize mt-2">
                    {pokemon.name}
                </h2>

                <div className="text-gray-600 font-semibold">
                    #{String(pokemon.id).padStart(3, '0')}
                </div>

                <div className="flex mt-2 gap-2">
                    {pokemon.types.map((type) => (
                        <span
                            key={type.type.name}
                            className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white text-xs px-2 py-1 rounded capitalize`}
                        >
              {type.type.name}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default PokemonCard;
