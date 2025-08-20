import jwt from 'jsonwebtoken';
import { Server } from 'http';
import request from 'supertest';
import app from '../../src/app';

export class TestUtils {
  static server: Server;
  static baseUrl: string;

  static async startServer(port: number = 3001): Promise<void> {
    return new Promise((resolve) => {
      this.server = app.listen(port, () => {
        this.baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  }

  static async stopServer(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => resolve());
      } else {
        resolve();
      }
    });
  }

  static generateToken(userId: string, email?: string): string {
    const payload = { id: userId, email };
    const secret = process.env.JWT_SECRET || 'test_secret';
    const options = { expiresIn: process.env.JWT_EXPIRES_IN || '1h' };
    
    return jwt.sign(payload, secret, options);
  }

  static getAuthHeaders(token: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  static async makeAuthenticatedRequest(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    token: string,
    data?: any
  ): Promise<request.Response> {
    const headers = this.getAuthHeaders(token);
    
    const supertestRequest = request(this.baseUrl);
    
    switch (method) {
      case 'get':
        return supertestRequest.get(url).set(headers);
      case 'post':
        return supertestRequest.post(url).set(headers).send(data);
      case 'put':
        return supertestRequest.put(url).set(headers).send(data);
      case 'delete':
        return supertestRequest.delete(url).set(headers);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  // Простая версия для тестов без запуска сервера
  static makeRequestToApp(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any) {
    const supertestRequest = request(app);
    
    switch (method) {
      case 'get':
        return supertestRequest.get(url);
      case 'post':
        return supertestRequest.post(url).send(data);
      case 'put':
        return supertestRequest.put(url).send(data);
      case 'delete':
        return supertestRequest.delete(url);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  static makeAuthenticatedRequestToApp(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    token: string,
    data?: any
  ) {
    const headers = this.getAuthHeaders(token);
    const supertestRequest = request(app);
    
    switch (method) {
      case 'get':
        return supertestRequest.get(url).set(headers);
      case 'post':
        return supertestRequest.post(url).set(headers).send(data);
      case 'put':
        return supertestRequest.put(url).set(headers).send(data);
      case 'delete':
        return supertestRequest.delete(url).set(headers);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
}