// src/repositories/sticky-note.repository.ts
import StickyNote from '../models/sticky-note.model';
import { CreateStickyNoteDto, UpdateStickyNoteDto } from '../dtos/sticky-note.dto';
import { NotFoundException } from '../exceptions';

class StickyNoteRepository {
  async findAll(userId: string): Promise<StickyNote[]> {
    return StickyNote.findAll({ where: { userId } });
  }

  async findById(id: string): Promise<StickyNote> {
    const note = await StickyNote.findByPk(id);
    if (!note) {
      throw new NotFoundException('Sticky note not found');
    }
    return note;
  }

  async create(data: CreateStickyNoteDto): Promise<StickyNote> {
    return StickyNote.create(data);
  }

  async update(id: string, data: UpdateStickyNoteDto): Promise<StickyNote> {
    const note = await this.findById(id);
    return note.update(data);
  }

  async delete(id: string): Promise<void> {
    const note = await this.findById(id);
    await note.destroy();
  }
}

export default new StickyNoteRepository();