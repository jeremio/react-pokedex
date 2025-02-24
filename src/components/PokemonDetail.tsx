import { useState, useEffect } from 'react';
import { fetchPokemonSpecies } from '../api/pokeApi.ts';
import { Pokemon, PokemonSpecies } from '../types/pokemon.ts';

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

interface PokemonDetailProps {
    pokemon: Pokemon;
    onClose: () => void;
}

type TabType = 'about' | 'stats' | 'moves';

function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
    const [species, setSpecies] = useState<PokemonSpecies | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('about');

    useEffect(() => {
        const getSpeciesData = async () => {
            try {
                const data = await fetchPokemonSpecies(pokemon.id);
                setSpecies(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'espèce:", error);
            }
        };

        getSpeciesData();
    }, [pokemon.id]);

    const getDescription = (): string => {
        if (!species) return "Chargement...";

        const frenchEntry = species.flavor_text_entries.find(
            entry => entry.language.name === 'fr'
        );

        if (frenchEntry) {
            return frenchEntry.flavor_text.replace(/\f/g, ' ');
        }

        const englishEntry = species.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );

        return englishEntry
            ? englishEntry.flavor_text.replace(/\f/g, ' ')
            : "Aucune description disponible.";
    };

    return (
        <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center sm:w-1/3">
                    <img
                        src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-40 h-40 object-contain"
                    />

                    <h2 className="text-2xl font-bold capitalize mt-2">
                        {pokemon.name}
                    </h2>

                    <div className="text-gray-600 font-semibold">
                        #{String(pokemon.id).padStart(3, '0')}
                    </div>

                    <div className="flex mt-2 gap-2">
                        {pokemon.types.map((type) => (
                            <span
                                key={type.type.name}
                                className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white px-3 py-1 rounded-full capitalize`}
                            >
                {type.type.name}
              </span>
                        ))}
                    </div>
                </div>

                <div className="sm:w-2/3">
                    <div className="flex border-b mb-4">
                        <button
                            className={`px-4 py-2 ${activeTab === 'about' ? 'border-b-2 border-red-500 font-semibold' : ''}`}
                            onClick={() => setActiveTab('about')}
                        >
                            À propos
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'stats' ? 'border-b-2 border-red-500 font-semibold' : ''}`}
                            onClick={() => setActiveTab('stats')}
                        >
                            Statistiques
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'moves' ? 'border-b-2 border-red-500 font-semibold' : ''}`}
                            onClick={() => setActiveTab('moves')}
                        >
                            Capacités
                        </button>
                    </div>

                    {activeTab === 'about' && (
                        <div>
                            <p className="mb-4">{getDescription()}</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold">Taille:</h3>
                                    <p>{pokemon.height / 10} m</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Poids:</h3>
                                    <p>{pokemon.weight / 10} kg</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Capacités:</h3>
                                    <p>{pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                                </div>
                                {species && (
                                    <div>
                                        <h3 className="font-semibold">Habitat:</h3>
                                        <p>{species.habitat ? species.habitat.name : 'Inconnu'}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div>
                            {pokemon.stats.map(stat => (
                                <div key={stat.stat.name} className="mb-3">
                                    <div className="flex justify-between mb-1">
                                        <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                                        <span>{stat.base_stat}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-red-600 h-2 rounded-full"
                                            style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'moves' && (
                        <div className="max-h-60 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-2">
                                {pokemon.moves.slice(0, 20).map(move => (
                                    <div key={move.move.name} className="bg-gray-100 p-2 rounded">
                                        <span className="capitalize">{move.move.name.replace('-', ' ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;
