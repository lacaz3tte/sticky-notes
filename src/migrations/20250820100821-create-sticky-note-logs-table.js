'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sticky_note_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      action: {
        type: Sequelize.ENUM('CREATE', 'UPDATE', 'DELETE'),
        allowNull: false,
      },
      noteId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sticky_notes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      data: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Добавляем индексы
    await queryInterface.addIndex('sticky_note_logs', ['noteId'], {
      name: 'sticky_note_logs_note_id_index'
    });

    await queryInterface.addIndex('sticky_note_logs', ['userId'], {
      name: 'sticky_note_logs_user_id_index'
    });

    await queryInterface.addIndex('sticky_note_logs', ['action'], {
      name: 'sticky_note_logs_action_index'
    });

    await queryInterface.addIndex('sticky_note_logs', ['createdAt'], {
      name: 'sticky_note_logs_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sticky_note_logs');
  },
};