import { faker } from '@faker-js/faker';
import StickyNoteLog from '../models/sticky-note-log.model';
import StickyNote from '../models/sticky-note.model';
import { SeederOptions } from './index';
import { NOTE_TEXTS, NOTE_COLORS } from './utils';

export async function seedStickyNoteLogs(options: SeederOptions, notes: StickyNote[]) {
  let totalLogs = 0;

  for (const note of notes) {
    // Лог создания
    await StickyNoteLog.create({
      action: 'CREATE',
      noteId: note.id,
      userId: note.userId,
      data: {
        text: note.text,
        positionX: note.positionX,
        positionY: note.positionY,
        zIndex: note.zIndex,
        color: note.color,
        createdAt: note.createdAt
      }
    });
    totalLogs++;

    // Логи обновления
    const updatesCount = faker.number.int({ min: 1, max: options.logsPerNote });
    for (let i = 0; i < updatesCount; i++) {
      await StickyNoteLog.create({
        action: 'UPDATE',
        noteId: note.id,
        userId: note.userId,
        data: {
          text: faker.helpers.arrayElement(NOTE_TEXTS),
          positionX: note.positionX + faker.number.int({ min: -50, max: 50 }),
          positionY: note.positionY + faker.number.int({ min: -50, max: 50 }),
          zIndex: note.zIndex + i,
          color: faker.helpers.arrayElement(NOTE_COLORS),
          updatedAt: new Date(note.createdAt.getTime() + (i + 1) * 3600000) // +1 hour per update
        }
      });
      totalLogs++;
    }
  }

  return totalLogs;
}