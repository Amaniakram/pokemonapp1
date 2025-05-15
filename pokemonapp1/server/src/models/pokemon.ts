import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface PokemonAttributes {
  id: number;
  pokemonName: string;
  pokemonType:string;
  pokemonOrder: number;
  pokemonAPIId: number;
  pokemonImage: string;
  pokemonWeight: number;
  userId: number;
}

interface PokemonCreationAttributes extends Optional<PokemonAttributes, 'id'> {}

export class Pokemon extends Model<PokemonAttributes, PokemonCreationAttributes> implements PokemonAttributes {

  public id!: number;
  public pokemonName!: string;
  pokemonType!:string;
  pokemonOrder!: number;
  pokemonAPIId!: number;
  pokemonImage!: string;
  pokemonWeight!: number;  
  userId!: number; 
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
      
      },
      pokemonOrder : {
        type : DataTypes.INTEGER,
       
      },
      pokemonAPIId: {
        type: DataTypes.INTEGER,
      },
      pokemonImage : {
        type: DataTypes.STRING,
      
      },
      pokemonWeight: {
        type : DataTypes.INTEGER,
     
      },
      userId: {
        type : DataTypes.INTEGER,
      }
    },
    {
      tableName: 'pokemon',
      sequelize,
    }
  );

  return Pokemon;
}
