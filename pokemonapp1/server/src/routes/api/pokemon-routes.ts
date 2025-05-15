import { Router } from 'express';
import {
  getAllPokemon,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
  getFavorites,
  searchPokemon} from '../../controllers/pokemonController.js'; // Make sure your controller file exists
import { authenticateToken } from '../../middleware/auth.js';

const pokemonRouter = Router();

// GET /pokemon - Get all Pokémon
pokemonRouter.get('/', getAllPokemon);

pokemonRouter.get('/favorites', authenticateToken, getFavorites);


// GET /pokemon/:id - Get a specific Pokémon by ID
pokemonRouter.get('/:id', getPokemonById);

// POST /pokemon - Create a new Pokémon (protected)
pokemonRouter.post('/', authenticateToken, createPokemon);

// PUT /pokemon/:id - Update a Pokémon (protected)
pokemonRouter.put('/:id', authenticateToken, updatePokemon);

// DELETE /pokemon/:id - Delete a Pokémon (protected)
pokemonRouter.delete('/:id', authenticateToken, deletePokemon);

// POST /pokemon/search - Search for Pokémon (protected)
pokemonRouter.post('/search', authenticateToken, searchPokemon);

export { pokemonRouter };
