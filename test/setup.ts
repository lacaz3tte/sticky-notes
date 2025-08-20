import * as dotenv from 'dotenv';

// Загружаем тестовые переменные окружения
dotenv.config({ path: '.env.test' });

// Моки для внешних зависимостей
jest.mock('socket.io', () => ({
  Server: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    use: jest.fn(),
    emit: jest.fn(),
  })),
}));

jest.mock('../src/config/database', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(true),
    sync: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
    query: jest.fn().mockResolvedValue([[], []]),
    getQueryInterface: jest.fn().mockReturnValue({
      createTable: jest.fn().mockResolvedValue(true),
      dropTable: jest.fn().mockResolvedValue(true),
    }),
  },
  testConnection: jest.fn().mockResolvedValue(true),
}));

// Глобальные тестовые переменные
(global as any).TEST_PORT = process.env.TEST_PORT || 3001;