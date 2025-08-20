import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

// Импортируем модели
import User from './user.model';
import Tag from './tag.model';
import StickyNote from './sticky-note.model';
import StickyNoteLog from './sticky-note-log.model';

// Инициализируем ассоциации
function setupAssociations() {
  // User associations
  User.hasMany(StickyNote, {
    foreignKey: 'userId',
    as: 'stickyNotes',
    onDelete: 'CASCADE'
  });
  
  User.hasMany(Tag, {
    foreignKey: 'userId',
    as: 'tags',
    onDelete: 'CASCADE'
  });
  
  User.hasMany(StickyNoteLog, {
    foreignKey: 'userId',
    as: 'stickyNoteLogs',
    onDelete: 'CASCADE'
  });

  // Tag associations
  Tag.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });
  
  Tag.belongsToMany(StickyNote, {
    through: 'sticky_note_tags',
    as: 'stickyNotes',
    foreignKey: 'tagId',
    otherKey: 'stickyNoteId'
  });

  // StickyNote associations
  StickyNote.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });
  
  StickyNote.belongsToMany(Tag, {
    through: 'sticky_note_tags',
    as: 'tags',
    foreignKey: 'stickyNoteId',
    otherKey: 'tagId'
  });
  
  StickyNote.hasMany(StickyNoteLog, {
    foreignKey: 'noteId',
    as: 'logs',
    onDelete: 'CASCADE'
  });

  // StickyNoteLog associations
  StickyNoteLog.belongsTo(StickyNote, {
    foreignKey: 'noteId',
    as: 'stickyNote'
  });
  
  StickyNoteLog.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });
}

// Экспортируем модели и функцию настройки
export {
  User,
  Tag,
  StickyNote,
  StickyNoteLog,
  setupAssociations,
  sequelize
};