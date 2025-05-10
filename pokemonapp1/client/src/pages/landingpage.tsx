import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 text-yellow-600 drop-shadow-md">Welcome to PokéTracker!</h1>
        <p className="text-lg text-gray-800 mb-6">
          Explore, collect, and track your favorite Pokémon. Dive into the world of Pokémon stats, abilities, and evolutions.
        </p>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="Pikachu"
          className="mx-auto w-40 h-40 mb-6 animate-bounce"
        />
        <div className="flex justify-center gap-4">
          <Link to="/signup">
            <button className="bg-yellow-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-white text-yellow-500 border border-yellow-400 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-100 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
