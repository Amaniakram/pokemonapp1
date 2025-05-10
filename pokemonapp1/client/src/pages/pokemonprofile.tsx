import React from 'react';

interface PokemonProfileProps {
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
}

const PokemonProfile: React.FC<PokemonProfileProps> = ({
  name,
  image,
  types,
  abilities,
  stats,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <div className="text-center">
        <img src={image} alt={name} className="w-32 h-32 mx-auto mb-4" />
        <h2 className="text-3xl font-bold capitalize">{name}</h2>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Types</h3>
        <div className="flex gap-2 mt-2">
          {types.map((type) => (
            <span
              key={type}
              className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Abilities</h3>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Stats</h3>
        <ul className="mt-2">
          {stats.map((stat) => (
            <li key={stat.name} className="flex justify-between border-b py-1">
              <span className="capitalize">{stat.name}</span>
              <span>{stat.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonProfile;
