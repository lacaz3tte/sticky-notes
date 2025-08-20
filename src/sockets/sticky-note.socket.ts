// src/sockets/sticky-note.socket.ts
import { Server, Socket } from 'socket.io';
import authService from '../services/auth.service';
import { UnauthorizedException } from '../exceptions';

enum StickyNoteEvents {
  CREATED = 'sticky-note:created',
  UPDATED = 'sticky-note:updated',
  DELETED = 'sticky-note:deleted',
}

class StickyNoteSocket {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.initialize();
  }

  private authenticateSocket(socket: Socket, next: (err?: Error) => void) {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new UnauthorizedException('No token provided'));
    }

    try {
      const payload = authService.verifyToken(token);
      socket.data.userId = payload.id;
      next();
    } catch (error) {
      next(new UnauthorizedException('Invalid token'));
    }
  }

  private initialize() {
    this.io.use(this.authenticateSocket);

    this.io.on('connection', (socket) => {
      console.log(`User ${socket.data.userId} connected`);

      socket.on('disconnect', () => {
        console.log(`User ${socket.data.userId} disconnected`);
      });
    });
  }

  async emitNoteCreated(note: any) {
    this.io.emit(StickyNoteEvents.CREATED, note);
  }

  async emitNoteUpdated(note: any) {
    this.io.emit(StickyNoteEvents.UPDATED, note);
  }

  async emitNoteDeleted(id: string) {
    this.io.emit(StickyNoteEvents.DELETED, { id });
  }
}

export default StickyNoteSocket;