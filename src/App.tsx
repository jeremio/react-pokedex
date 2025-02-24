import { Suspense, lazy, useState, useEffect } from 'react';
import { usePokeStore } from './store/pokeStore.ts';
import SearchBar from './components/SearchBar.tsx';
import PokemonList from './components/PokemonList.tsx';
import Loading from './components/Loading.tsx';
import { Pokemon } from './types/pokemon.ts';

const PokemonDetail = lazy(() => import('./components/PokemonDetail.tsx'));

function App() {
    const { isLoading, initialize } = usePokeStore();
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Initialiser les données au démarrage de l'application
    useEffect(() => {
        console.log('App: Initializing pokemon data...');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        initialize();
    }, []);

    const handleSelectPokemon = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleCloseDetail = () => {
        setSelectedPokemon(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-red-600 p-4 shadow-md">
                <h1 className="text-3xl font-bold text-white text-center">Pokédex</h1>
            </header>

            <main className="container mx-auto p-4">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <PokemonList
                            searchTerm={searchTerm}
                            onSelectPokemon={handleSelectPokemon}
                        />

                        {selectedPokemon && (
                            <Suspense fallback={<Loading />}>
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <PokemonDetail
                                        pokemon={selectedPokemon}
                                        onClose={handleCloseDetail}
                                    />
                                </div>
                            </Suspense>
                        )}
                    </>
                )}
            </main>

            <footer className="bg-gray-800 text-white p-4 text-center mt-8">
                <p>Pokédex App - Données fournies par l'API PokeAPI</p>
            </footer>
        </div>
    );
}

export default App;
