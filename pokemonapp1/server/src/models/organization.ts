import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the shape of organization data
interface OrganizationAttributes {
  id: number;
  name: string;
  description: string;
  location: string;
}

// Define which attributes are optional for creation
interface OrganizationCreationAttributes extends Optional<OrganizationAttributes, 'id'> {}

// Define the Organization model class
export class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public location!: string;

  // Timestamps automatically added by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to register the model with Sequelize
export function OrganizationFactory(sequelize: Sequelize): typeof Organization {
  Organization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'organizations',
      sequelize,
    }
  );

  return Organization;
}
