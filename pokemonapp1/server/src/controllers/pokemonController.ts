import { Request, Response } from 'express';
import { Pokemon } from '../models/pokemon.js';
import { Op } from 'sequelize'; // Add this import for Op

// GET /api/pokemon - Fetch all Pokémon
export const getAllPokemon = async (_req: Request, res: Response) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json({ data: pokemons });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Pokémon list', error: err });
  }
};

// GET /api/pokemon/:id - Fetch Pokémon by ID
export const getPokemonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      res.status(404).json({ message: 'Pokémon not found' });
      return;
    }

    res.status(200).json(pokemon);
  } catch (error) {
    console.error('Error fetching Pokémon by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/pokemon - Create a new Pokémon
export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { pokemonName, pokemonType, pokemonHP, pokemonAbility, scorchingFire } = req.body;

    if (!pokemonName || !pokemonType) {
      return res.status(400).json({ message: 'Name and type are required.' });
    }

    const newPokemon = await Pokemon.create({
      pokemonName,
      pokemonType,
      pokemonHP,
      pokemonAbility,
      scorchingFire
    });

    res.status(201).json({ message: 'Pokémon created successfully', data: newPokemon });
  } catch (err) {
    console.error('Error creating Pokémon:', err);
    res.status(500).json({ message: 'Failed to create Pokémon', error: err });
  }
};

// PUT /api/pokemon/:id - Update Pokémon by ID
export const updatePokemon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { pokemonName, pokemonType, pokemonHP, pokemonAbility, scorchingFire } = req.body;

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      res.status(404).json({ message: 'Pokémon not found' });
      return;
    }

    // Update only the fields provided in the request
    await pokemon.update({
      pokemonName,
      pokemonType,
      pokemonHP,
      pokemonAbility,
      scorchingFire
    });

    res.status(200).json({ message: 'Pokémon updated successfully', data: pokemon });
  } catch (err) {
    console.error('Error updating Pokémon:', err);
    res.status(500).json({ message: 'Failed to update Pokémon', error: err });
  }
};

// DELETE /api/pokemon/:id - Delete Pokémon by ID
export const deletePokemon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      res.status(404).json({ message: 'Pokémon not found' });
      return;
    }

    await pokemon.destroy();

    res.status(200).json({ message: 'Pokémon deleted successfully' });
  } catch (err) {
    console.error('Error deleting Pokémon:', err);
    res.status(500).json({ message: 'Failed to delete Pokémon', error: err });
  }
};

// POST /api/pokemon/search - Search for Pokémon
export const searchPokemon = async (req: Request, res: Response) => {
  try {
    const { query } = req.body; // Assuming search term is in the request body

    const pokemons = await Pokemon.findAll({
      where: {
        pokemonName: {
          [Op.like]: `%${query}%` // Using Op.like for pattern matching
        }
      }
    });

    if (pokemons.length === 0) {
      res.status(404).json({ message: 'No Pokémon found' });
      return;
    }

    res.status(200).json({ data: pokemons });
  } catch (err) {
    res.status(500).json({ message: 'Error searching for Pokémon', error: err });
  }
};
