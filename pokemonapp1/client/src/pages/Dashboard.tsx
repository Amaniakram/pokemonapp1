import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

const Dashboard = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-500">Your Pokémon Dashboard</h1>

      {loading ? (
        <p className="text-center text-blue-500">Loading Pokémon...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {pokemonList.map((pokemon, _name) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return (
              <div
                key={pokemon.name}
                className="bg-white rounded-xl shadow-md p-4 text-center hover:scale-105 transition-transform"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  className="mx-auto w-20 h-20"
                />
                <p className="capitalize mt-2 text-gray-800">{pokemon.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
