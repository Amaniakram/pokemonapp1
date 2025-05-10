export interface Pokemon {
    id: number;
    name: string;
    image? : string;
    type: string[]; // An array to support multiple types (e.g., Fire, Water, Electric)
    gender: string; // Pokémon may have "Male", "Female", or other identifiers
    species: string; // This could represent the Pokémon species (e.g., Pikachu, Charmander)
    abilities: string[]; // List of Pokémon abilities (e.g., Static, Blaze)
    stats: {
      hp: number;
      attack: number;
      defense: number;
      specialAttack: number;
      specialDefense: number;
      speed: number;
    };
    evolutions?: {
      name: string;
      level: number;
      evolvesFrom?: string; // Pokémon evolution chain
    }[];
    photos?: {
      small: string; // Image for displaying small-sized Pokémon images
      medium: string; // Image for medium-sized Pokémon images
      large: string; // Image for large-sized Pokémon images
      full: string; // Full image if available
    }[];
    primary_photo_cropped?: {
      small?: string;
      medium?: string;
      large?: string;
      full?: string;
    };
    habitat: string; // The location or region where the Pokémon can be found (e.g., Forest, Cave)
    contact: {
      email?: string | null;
      phone?: string | null;
      region: string; // Specific Pokémon region (e.g., Kanto, Johto)
    };
    url: string; // URL for more information about the Pokémon
  }
  