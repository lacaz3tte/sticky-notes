// src/services/sticky-note.service.ts
import stickyNoteRepository from '../repositories/sticky-note.repository';
import stickyNoteSocket from '../sockets/sticky-note.socket';
import { CreateStickyNoteDto, UpdateStickyNoteDto } from '../dtos/sticky-note.dto';
import { NotFoundException, ForbiddenException } from '../exceptions';

class StickyNoteService {
  async getAllNotes(userId: string) {
    return stickyNoteRepository.findAll(userId);
  }

  async getNoteById(id: string, userId: string) {
    const note = await stickyNoteRepository.findById(id);
    if (note.userId !== userId) {
      throw new ForbiddenException('You are not allowed to access this note');
    }
    return note;
  }

  async createNote(data: CreateStickyNoteDto, userId: string) {
    const note = await stickyNoteRepository.create({ ...data, userId });
    await stickyNoteSocket.emitNoteCreated(note);
    return note;
  }

  async updateNote(id: string, data: UpdateStickyNoteDto, userId: string) {
    const note = await this.getNoteById(id, userId);
    const updatedNote = await stickyNoteRepository.update(id, data);
    await stickyNoteSocket.emitNoteUpdated(updatedNote);
    return updatedNote;
  }

  async deleteNote(id: string, userId: string) {
    await this.getNoteById(id, userId);
    await stickyNoteRepository.delete(id);
    await stickyNoteSocket.emitNoteDeleted(id);
  }
}

export default new StickyNoteService();