import { useState, useEffect } from 'react';

type Pokemon = {
  name: string;
  type: string;
};

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPokemon, setNewPokemon] = useState<Pokemon>({ name: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetching Pokémon
  useEffect(() => {
    fetch('http://localhost:5000/api/pokemon')
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPokemon((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/pokemon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPokemon),
      });

      if (!response.ok) throw new Error('Failed to create Pokémon');

      const result = await response.json();
      setPokemonList((prev) => [...prev, result.data]); // Add new Pokémon to the list
      setNewPokemon({ name: '', type: '' }); // Reset form
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false); // Ensure form submission state is reset
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Pokémon List</h1>

      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="space-y-2 w-full max-w-md">
        {pokemonList.map((pokemon, index) => (
          <li key={index} className="bg-gray-700 rounded-lg px-4 py-2 flex justify-between">
            <span>{pokemon.name}</span>
            <span className="text-sm text-gray-300">{pokemon.type}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Add a New Pokémon</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="name"
            value={newPokemon.name}
            onChange={handleChange}
            placeholder="Pokémon Name"
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            required
          />
          <input
            type="text"
            name="type"
            value={newPokemon.type}
            onChange={handleChange}
            placeholder="Pokémon Type"
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 rounded-lg text-white hover:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Pokémon'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PokemonList;