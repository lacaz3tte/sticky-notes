// src/config/database.ts
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// Определяем хост в зависимости от среды выполнения
const isDocker = process.env.DOCKER_ENV === 'true';
const dbHost = isDocker ? 'postgres' : (process.env.DB_HOST || 'localhost');

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: dbHost,
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      max: 3,
      timeout: 30000,
    },
  }
);

export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export { sequelize };