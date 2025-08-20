import request from 'supertest';
import { TestUtils } from '../utils/test-utils';
import { User, StickyNote, Tag, sequelize } from '../../src/models';

describe('Sticky Notes API', () => {
  let authToken: string;
  let testUser: User;
  let testNote: StickyNote;
  let testTag: Tag;

  beforeAll(async () => {
    await TestUtils.startServer();
    await sequelize.sync({ force: true });

    // Создаем тестового пользователя
    testUser = await User.create({
      email: 'stickyuser@example.com',
      password: 'password123',
      isPro: true,
    });

    authToken = TestUtils.generateToken(testUser.id, testUser.email);

    // Создаем тестовый тег
    testTag = await Tag.create({
      name: 'Test Tag',
      color: '#ff0000',
      userId: testUser.id,
    });

    // Создаем тестовый стикер
    testNote = await StickyNote.create({
      text: 'Test Sticky Note',
      positionX: 100,
      positionY: 200,
      zIndex: 1,
      color: '#ffff88',
      userId: testUser.id,
    });
  });

  afterAll(async () => {
    await TestUtils.stopServer();
    await sequelize.close();
  });

  describe('GET /api/sticky-notes', () => {
    it('should get all sticky notes for user', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'get',
        '/api/sticky-notes',
        authToken
      );

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 401 without authentication', async () => {
      const response = await request(TestUtils.baseUrl)
        .get('/api/sticky-notes');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/sticky-notes/:id', () => {
    it('should get a specific sticky note', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'get',
        `/api/sticky-notes/${testNote.id}`,
        authToken
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testNote.id);
      expect(response.body.text).toBe(testNote.text);
    });

    it('should return 404 for non-existent note', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'get',
        '/api/sticky-notes/nonexistent-id',
        authToken
      );

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/sticky-notes', () => {
    it('should create a new sticky note', async () => {
      const newNote = {
        text: 'New Test Note',
        positionX: 300,
        positionY: 400,
        color: '#88ff88',
        tagIds: [testTag.id],
      };

      const response = await TestUtils.makeAuthenticatedRequest(
        'post',
        '/api/sticky-notes',
        authToken,
        newNote
      );

      expect(response.status).toBe(201);
      expect(response.body.text).toBe(newNote.text);
      expect(response.body.userId).toBe(testUser.id);
    });

    it('should return 400 for invalid data', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'post',
        '/api/sticky-notes',
        authToken,
        { text: '' } // Invalid: empty text
      );

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/sticky-notes/:id', () => {
    it('should update a sticky note', async () => {
      const updateData = {
        text: 'Updated Text',
        positionX: 500,
        color: '#ff8888',
      };

      const response = await TestUtils.makeAuthenticatedRequest(
        'put',
        `/api/sticky-notes/${testNote.id}`,
        authToken,
        updateData
      );

      expect(response.status).toBe(200);
      expect(response.body.text).toBe(updateData.text);
      expect(response.body.positionX).toBe(updateData.positionX);
    });

    it('should return 404 for non-existent note', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'put',
        '/api/sticky-notes/nonexistent-id',
        authToken,
        { text: 'Updated' }
      );

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/sticky-notes/:id', () => {
    it('should delete a sticky note', async () => {
      const noteToDelete = await StickyNote.create({
        text: 'Note to delete',
        positionX: 100,
        positionY: 100,
        userId: testUser.id,
      });

      const response = await TestUtils.makeAuthenticatedRequest(
        'delete',
        `/api/sticky-notes/${noteToDelete.id}`,
        authToken
      );

      expect(response.status).toBe(204);

      // Verify it's deleted
      const checkResponse = await TestUtils.makeAuthenticatedRequest(
        'get',
        `/api/sticky-notes/${noteToDelete.id}`,
        authToken
      );
      expect(checkResponse.status).toBe(404);
    });
  });

  describe('POST /api/sticky-notes/:id/move', () => {
    it('should move a sticky note to front', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'post',
        `/api/sticky-notes/${testNote.id}/move`,
        authToken,
        { position: 'front' }
      );

      expect(response.status).toBe(200);
      expect(response.body.zIndex).toBeDefined();
    });

    it('should return 400 for invalid move position', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'post',
        `/api/sticky-notes/${testNote.id}/move`,
        authToken,
        { position: 'invalid' }
      );

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/sticky-notes/search', () => {
    it('should search sticky notes', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'get',
        '/api/sticky-notes/search?q=Test',
        authToken
      );

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});