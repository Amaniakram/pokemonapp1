import { Request, Response } from 'express';
import { Pokemon } from '../models/pokemon.js';

// GET /api/pokemon - Fetch all Pokémon
export const getAllPokemon = async (_req: Request, res: Response) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json({ data: pokemons });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Pokémon list', error: err });
  }
};

// POST /api/pokemon - Create a new Pokémon
export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { pokemonName, pokemonType, pokemonHP, pokemonAbility, scorchingFire } = req.body;

    if (!pokemonName || !pokemonType) {
       res.status(400).json({ message: 'Name and type are required.' });
    }

    const newPokemon = await Pokemon.create({pokemonName, pokemonType,  pokemonHP, pokemonAbility, scorchingFire });
    res.status(201).json({ data: newPokemon });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create Pokémon', error: err });
  }
};

// Optional echo route for testing (not used if createPokemon is active)
export const addPokemon = (req: Request, res: Response) => {
  const newPokemon = req.body;
  res.status(201).json({ message: 'New Pokémon added!', data: newPokemon });
};