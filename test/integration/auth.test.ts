import request from 'supertest';
import { TestUtils } from '../utils/test-utils';
import { sequelize } from '../../src/models';

describe('Auth API', () => {
  beforeAll(async () => {
    await TestUtils.startServer();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await TestUtils.stopServer();
    await sequelize.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(TestUtils.baseUrl)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(TestUtils.baseUrl)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should return 400 for short password', async () => {
      const response = await request(TestUtils.baseUrl)
        .post('/api/auth/register')
        .send({
          email: 'test2@example.com',
          password: 'short',
        });

      expect(response.status).toBe(400);
    });

    it('should return 400 for duplicate email', async () => {
      const response = await request(TestUtils.baseUrl)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com', // Already registered
          password: 'password123',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(TestUtils.baseUrl)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(TestUtils.baseUrl)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });

    it('should return 401 for non-existent user', async () => {
      const response = await request(TestUtils.baseUrl)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
    });
  });
});