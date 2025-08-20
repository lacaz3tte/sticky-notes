// src/models/sticky-note-tag.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class StickyNoteTag extends Model {
  public stickyNoteId!: string;
  public tagId!: string;
}

StickyNoteTag.init({
  stickyNoteId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  tagId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'sticky_note_tags',
});

export default StickyNoteTag;