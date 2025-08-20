import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class StickyNoteLog extends Model {
  public id!: string;
  public action!: 'CREATE' | 'UPDATE' | 'DELETE';
  public noteId!: string;
  public userId!: string;
  public data!: object;
  public readonly createdAt!: Date;
}

StickyNoteLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    action: {
      type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE'),
      allowNull: false,
    },
    noteId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sticky_note_logs',
    timestamps: true,
    updatedAt: false,
  }
);

export default StickyNoteLog;