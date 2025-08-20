import request from 'supertest';
import { TestUtils } from '../utils/test-utils';

describe('General API', () => {
  beforeAll(async () => {
    await TestUtils.startServer();
  });

  afterAll(async () => {
    await TestUtils.stopServer();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(TestUtils.baseUrl)
        .get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Non-existent routes', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(TestUtils.baseUrl)
        .get('/nonexistent-route');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 for unknown API routes', async () => {
      const response = await request(TestUtils.baseUrl)
        .get('/api/nonexistent-route');

      expect(response.status).toBe(404);
    });
  });
});