import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { pokemonRouter } from './pokemon-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/pokemons', pokemonRouter);


export default router;
