import { faker } from '@faker-js/faker';
import { StickyNote, Tag } from '../models';
import { SeederOptions } from './index';
import { NOTE_TEXTS, NOTE_COLORS } from './utils';

export async function seedStickyNotes(options: SeederOptions, users: any[], tags: Tag[]) {
  const notes = [];

  for (const user of users) {
    const userTags = tags.filter(tag => tag.userId === user.id);
    
    for (let i = 0; i < options.notesPerUser; i++) {
      const noteText = NOTE_TEXTS[i % NOTE_TEXTS.length];
      const note = await StickyNote.create({
        text: `${noteText}${i > 0 ? ` #${i + 1}` : ''}`,
        positionX: faker.number.int({ min: 0, max: 1000 }),
        positionY: faker.number.int({ min: 0, max: 800 }),
        zIndex: i,
        color: NOTE_COLORS[i % NOTE_COLORS.length],
        userId: user.id,
      });

      // Добавляем теги к стикеру через промежуточную таблицу
      if (userTags.length > 0) {
        const noteTags = faker.helpers.arrayElements(
          userTags, 
          faker.number.int({ min: 1, max: options.tagsPerNote })
        );
        
        // Используем правильный метод для добавления тегов
        for (const tag of noteTags) {
          await (note as any).addTag(tag);
        }
      }

      notes.push(note);
    }
  }

  return notes;
}