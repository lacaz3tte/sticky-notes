import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Tag extends Model {
  public id!: string;
  public name!: string;
  public color!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#cccccc',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tags',
    indexes: [
      {
        unique: true,
        fields: ['name', 'userId'],
      },
    ],
  }
);

export default Tag;