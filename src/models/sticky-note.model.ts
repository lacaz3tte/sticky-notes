import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class StickyNote extends Model {
  public id!: string;
  public text!: string;
  public positionX!: number;
  public positionY!: number;
  public zIndex!: number;
  public color!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

StickyNote.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    positionX: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    positionY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    zIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#ffff88',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'sticky_notes',
    paranoid: true,
    defaultScope: {
      where: { deletedAt: null },
    },
    scopes: {
      withDeleted: {
        paranoid: false,
      },
    },
  }
);

export default StickyNote;