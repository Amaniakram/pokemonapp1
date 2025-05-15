import { Request, Response } from 'express';
import { Pokemon } from '../models/pokemon.js';
import { Op } from 'sequelize'; // Add this import for Op
import { User } from '../models/index.js';

// GET /api/pokemon - Fetch all Pokémon
export const getAllPokemon = async (_req: Request, res: Response) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json({ data: pokemons });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Pokémon list', error: err });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    console.log(req?.user)
    const currentUser = await User.findOne({
      where: {
        username: req?.user?.username
      }
    })

    console.log(currentUser)
    const pokemons = await Pokemon.findAll({
      where: {
        userId: currentUser?.id
      }
    });
    console.log(pokemons)
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
    const currentUser = await User.findOne({
      where: {
        username: req?.user?.username
      }
    });

    console.log(currentUser)

    const userId = currentUser?.id || 0;


    const { pokemonName, pokemonType, pokemonOrder, pokemonAPIId, pokemonImage, pokemonWeight } = req.body;

    if (!pokemonName || !pokemonType) {
       res.status(400).json({ message: 'Name and type are required.' });
    }

    const newPokemon = await Pokemon.create({pokemonName, pokemonType,  pokemonOrder, pokemonAPIId, pokemonImage, pokemonWeight, userId });
    res.status(201).json({ data: newPokemon });
  } catch (err) {
    console.log(err)
    console.error('Error creating Pokémon:', err);
    res.status(500).json({ message: 'Failed to create Pokémon', error: err });
  }
};


export const updatePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { pokemonName, pokemonType, pokemonOrder, pokemonAPIId, pokemonImage, pokemonWeight } = req.body;

    if (!pokemonName || !pokemonType) {
      res.status(400).json({ message: 'Name and type are required.' });
      return;
    }

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      res.status(404).json({ message: 'Pokémon not found.' });
      return;
    }

    // Update only the fields provided in the request
    await pokemon.update({
      pokemonName,
      pokemonType,
      pokemonOrder,
      pokemonAPIId,
      pokemonImage,
      pokemonWeight,
    });

    res.status(200).json({ data: pokemon });
  } catch (err) {
    console.error('Error updating Pokémon:', err);
    res.status(500).json({ message: 'Failed to update Pokémon', error: err });
  }
};

// Optional echo route for testing (not used if createPokemon is active)
export const addPokemon = (req: Request, res: Response) => {
  const newPokemon = req.body;
  res.status(201).json({ message: 'New Pokémon added!', data: newPokemon });
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
