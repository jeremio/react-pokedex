import { Pokemon, PokemonListResponse, PokemonSpecies } from '../types/pokemon.ts';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (limit = 151, offset = 0): Promise<Pokemon[]> => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        const data: PokemonListResponse = await response.json();

        // Récupérer les détails de chaque Pokémon en parallèle
        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
                const detailResponse = await fetch(pokemon.url);
                return await detailResponse.json() as Pokemon;
            })
        );

        return pokemonDetails;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw error;
    }
};

export const fetchPokemonDetails = async (id: number | string): Promise<Pokemon> => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${id}`);
        return await response.json() as Pokemon;
    } catch (error) {
        console.error(`Error fetching pokemon details for id ${id}:`, error);
        throw error;
    }
};

export const fetchPokemonSpecies = async (id: number | string): Promise<PokemonSpecies> => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
        return await response.json() as PokemonSpecies;
    } catch (error) {
        console.error(`Error fetching pokemon species for id ${id}:`, error);
        throw error;
    }
};
