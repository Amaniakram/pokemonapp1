import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-red-100 to-pink-200 flex flex-col items-center justify-center text-center px-4">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        alt="Pokemon App Logo"
        className="w-48 mb-6"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to the Pokémon App!
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl">
        Discover, collect, and track your favorite Pokémon. Search by name, explore abilities, and dive into the world of Pokémon!
      </p>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded shadow">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
