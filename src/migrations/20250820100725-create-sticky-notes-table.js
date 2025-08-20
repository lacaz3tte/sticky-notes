'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sticky_notes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      positionX: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      positionY: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      zIndex: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING(20),
        defaultValue: '#ffff88',
        allowNull: false,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Добавляем индексы
    await queryInterface.addIndex('sticky_notes', ['userId'], {
      name: 'sticky_notes_user_id_index'
    });

    await queryInterface.addIndex('sticky_notes', ['deletedAt'], {
      name: 'sticky_notes_deleted_at_index'
    });

    await queryInterface.addIndex('sticky_notes', ['zIndex'], {
      name: 'sticky_notes_z_index_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sticky_notes');
  },
};