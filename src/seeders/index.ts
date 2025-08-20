import * as dotenv from 'dotenv';
import { sequelize, setupAssociations, User, Tag, StickyNote, StickyNoteLog } from '../models';
import { seedUsers } from './user.seeder';
import { seedTags } from './tag.seeder';
import { seedStickyNotes } from './sticky-note.seeder';
import { seedStickyNoteLogs } from './sticky-note-log.seeder';

dotenv.config();

export interface SeederOptions {
  usersCount: number;
  tagsPerUser: number;
  notesPerUser: number;
  tagsPerNote: number;
  logsPerNote: number;
}

export const defaultSeederOptions: SeederOptions = {
  usersCount: 3,
  tagsPerUser: 5,
  notesPerUser: 15,
  tagsPerNote: 2,
  logsPerNote: 3
};

export async function runSeeders(options?: Partial<SeederOptions>) {
  const mergedOptions = { ...defaultSeederOptions, ...options };

  try {
    console.log('🚀 Starting database seeding...');

    // Настраиваем ассоциации
    setupAssociations();

    // Синхронизируем базу данных
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Запускаем сидеры последовательно
    const users = await seedUsers(mergedOptions);
    console.log(`✅ Created ${users.length} users`);

    const tags = await seedTags(mergedOptions, users);
    console.log(`✅ Created ${tags.length} tags`);

    const notes = await seedStickyNotes(mergedOptions, users, tags);
    console.log(`✅ Created ${notes.length} sticky notes`);

    const logsCount = await seedStickyNoteLogs(mergedOptions, notes);
    console.log(`✅ Created ${logsCount} log entries`);

    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Tags: ${tags.length}`);
    console.log(`   - Sticky Notes: ${notes.length}`);
    console.log(`   - Log entries: ${logsCount}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Запуск сидеров, если файл вызван напрямую
if (require.main === module) {
  runSeeders().catch(console.error);
}