import React, { useEffect, useState } from "react";
import { Pokemon } from "../interfaces/pokemon.js";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favorites: Pokemon[] = JSON.parse(stored);
      const already = favorites.some((f) => f.id === pokemon.id);
      setIsFavorited(already);
    }
  }, [pokemon.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem("favorites");
    let favorites: Pokemon[] = stored ? JSON.parse(stored) : [];

    if (isFavorited) {
      favorites = favorites.filter((f) => f.id !== pokemon.id);
    } else {
      favorites.push(pokemon);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <a
      href={pokemon.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <div className="bg-white rounded shadow p-4 flex flex-col items-center text-center relative">
        <img
          src={
            pokemon.image ||
            pokemon.primary_photo_cropped?.medium ||
            "/fallback-pokemon.png"
          }
          alt={pokemon.name}
          className="w-full h-48 object-cover rounded mb-4"
        />

        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3"
          title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <img
            src="/PawFavorite.svg"
            alt="Favorite icon"
            className={`w-10 h-30 transition duration-200 ${
              isFavorited ? "opacity-100" : "opacity-40"
            }`}
          />
        </button>

        <h3 className="font-bold text-lg">{pokemon.name}</h3>
        <p className="text-sm text-gray-600 capitalize">
          {pokemon.type.join(", ")}
        </p>
        <p className="text-sm text-gray-500">
          {pokemon.contact?.region || "Unknown Region"}
          <br />
          {/* Optional: Add base_experience if you decide to include it in the interface */}
        </p>
      </div>
    </a>
  );
};

export default PokemonCard;
