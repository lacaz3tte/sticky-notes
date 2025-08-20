import request from 'supertest';
import { TestUtils } from '../utils/test-utils';
import { User, Tag, StickyNote, sequelize } from '../../src/models';

describe('Tags API', () => {
  let authToken: string;
  let testUser: User;
  let testTag: Tag;
  let testNote: StickyNote;

  beforeAll(async () => {
    await TestUtils.startServer();
    await sequelize.sync({ force: true });

    testUser = await User.create({
      email: 'taguser@example.com',
      password: 'password123',
      isPro: true,
    });

    authToken = TestUtils.generateToken(testUser.id, testUser.email);

    testTag = await Tag.create({
      name: 'Test Tag',
      color: '#ff0000',
      userId: testUser.id,
    });

    testNote = await StickyNote.create({
      text: 'Test Note for Tags',
      positionX: 100,
      positionY: 100,
      userId: testUser.id,
    });

    // Связываем тег со стикером
    await (testNote as any).addTag(testTag);
  });

  afterAll(async () => {
    await TestUtils.stopServer();
    await sequelize.close();
  });

  describe('GET /api/tags', () => {
    it('should get all tags for user', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'get',
        '/api/tags',
        authToken
      );

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/tags/:id', () => {
    it('should get a specific tag', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'get',
        `/api/tags/${testTag.id}`,
        authToken
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testTag.id);
      expect(response.body.name).toBe(testTag.name);
    });
  });

  describe('POST /api/tags', () => {
    it('should create a new tag', async () => {
      const newTag = {
        name: 'New Test Tag',
        color: '#00ff00',
      };

      const response = await TestUtils.makeAuthenticatedRequest(
        'post',
        '/api/tags',
        authToken,
        newTag
      );

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(newTag.name);
      expect(response.body.color).toBe(newTag.color);
    });
  });

  describe('PUT /api/tags/:id', () => {
    it('should update a tag', async () => {
      const updateData = {
        name: 'Updated Tag Name',
        color: '#0000ff',
      };

      const response = await TestUtils.makeAuthenticatedRequest(
        'put',
        `/api/tags/${testTag.id}`,
        authToken,
        updateData
      );

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updateData.name);
    });
  });

  describe('DELETE /api/tags/:id', () => {
    it('should delete a tag', async () => {
      const tagToDelete = await Tag.create({
        name: 'Tag to delete',
        color: '#ff00ff',
        userId: testUser.id,
      });

      const response = await TestUtils.makeAuthenticatedRequest(
        'delete',
        `/api/tags/${tagToDelete.id}`,
        authToken
      );

      expect(response.status).toBe(204);
    });
  });

  describe('GET /api/tags/:id/sticky-notes', () => {
    it('should get sticky notes for a tag', async () => {
      const response = await TestUtils.makeAuthenticatedRequest(
        'get',
        `/api/tags/${testTag.id}/sticky-notes`,
        authToken
      );

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});