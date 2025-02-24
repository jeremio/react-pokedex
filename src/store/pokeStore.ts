import { create } from 'zustand';
import { fetchPokemons } from '../api/pokeApi';
import { Pokemon } from '../types/pokemon';

interface PokeState {
    pokemons: Pokemon[];
    isLoading: boolean;
    error: string | null;
    hasInitialized: boolean;
    initialize: () => Promise<void>;
    searchPokemons: (term: string) => Pokemon[];
}

export const usePokeStore = create<PokeState>((set, get) => ({
    pokemons: [],
    isLoading: true,
    error: null,
    hasInitialized: false,

    // Initialisation des données
    initialize: async () => {
        // Vérifier si l'initialisation est déjà effectuée ou en cours
        if (get().hasInitialized || (get().isLoading && get().pokemons.length > 0)) {
            console.log('Initialization already done or in progress, skipping...');
            return;
        }

        // Marquer comme initialisé avant de commencer pour éviter les appels parallèles
        set({isLoading: true, hasInitialized: true});

        try {
            console.log('Fetching Pokemon data...');
            const pokemons = await fetchPokemons();
            set({pokemons, isLoading: false});
            console.log(`Successfully loaded ${pokemons.length} Pokemon`);
        } catch (error) {
            console.error('Error during initialization:', error);
            set({
                error: error instanceof Error ? error.message : String(error),
                isLoading: false
            });
        }
    },
    searchPokemons: (term: string): Pokemon[] => {
        if (!term.trim()) return get().pokemons;

        const normalizedTerm = term.toLowerCase();

        // Recherche directe sur le tableau pokemons
        return get().pokemons.filter(pokemon =>
            // Recherche par nom
            pokemon.name.toLowerCase().includes(normalizedTerm) ||
            // Recherche par ID
            pokemon.id.toString() === normalizedTerm ||
            // Recherche par type
            pokemon.types.some(type => type.type.name.toLowerCase().includes(normalizedTerm))
        );
    },
}));
