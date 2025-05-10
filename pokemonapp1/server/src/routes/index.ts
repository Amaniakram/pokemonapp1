import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { getAllPokemon, createPokemon } from '../controllers/pokemonController.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);

router.get('/', getAllPokemon);
router.post('/', createPokemon);

export default router;
