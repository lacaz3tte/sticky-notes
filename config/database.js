// config/database.js
require('dotenv').config();

// Функция для получения конфигурации базы данных
function getDatabaseConfig() {
  const isDocker = process.env.DOCKER_ENV === 'true';
  
  return {
    development: {
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "sticky_notes_db",
      host: isDocker ? "postgres" : (process.env.DB_HOST || "localhost"),
      port: parseInt(process.env.DB_PORT || "5432"),
      dialect: "postgres",
      logging: console.log
    },
    test: {
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: (process.env.DB_NAME || "sticky_notes_db") + "_test",
      host: isDocker ? "postgres" : (process.env.DB_HOST || "localhost"),
      port: parseInt(process.env.DB_PORT || "5432"),
      dialect: "postgres",
      logging: false
    },
    production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  };
}

module.exports = getDatabaseConfig();