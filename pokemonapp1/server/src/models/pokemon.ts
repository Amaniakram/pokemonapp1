import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface PokemonAttributes {
  id: number;
  pokemonName: string;
  pokemonType:string;
  pokemonHP: number;
  pokemonAbility: string;
  scorchingFire: number;
}

interface PokemonCreationAttributes extends Optional<PokemonAttributes, 'id'> {}

export class Pokemon extends Model<PokemonAttributes, PokemonCreationAttributes> implements PokemonAttributes {
  public id!: number;
  public pokemonName!: string;
  pokemonType!:string;
  pokemonHP!: number;
  pokemonAbility!: string;
  scorchingFire!: number;   
}

export function PokemonFactory(sequelize: Sequelize): typeof Pokemon {
  Pokemon.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pokemonName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pokemonType :{
        type: DataTypes.STRING,
        allowNull: false,
      },
      pokemonHP : {
        type : DataTypes.INTEGER,
        allowNull: false,

      },
      pokemonAbility: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      scorchingFire: {
        type : DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'pokemon',
      sequelize,
    }
  );

  return Pokemon;
}
