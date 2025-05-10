import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { PokemonFactory } from './pokemon.js';
const User = UserFactory(sequelize);
const Pokemon = PokemonFactory( sequelize);

export { User, Pokemon };
