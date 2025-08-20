'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sticky_note_tags', {
      stickyNoteId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sticky_notes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tagId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Добавляем составной первичный ключ
    await queryInterface.addConstraint('sticky_note_tags', {
      fields: ['stickyNoteId', 'tagId'],
      type: 'primary key',
      name: 'sticky_note_tags_pkey'
    });

    // Добавляем индексы
    await queryInterface.addIndex('sticky_note_tags', ['stickyNoteId'], {
      name: 'sticky_note_tags_note_id_index'
    });

    await queryInterface.addIndex('sticky_note_tags', ['tagId'], {
      name: 'sticky_note_tags_tag_id_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sticky_note_tags');
  },
};