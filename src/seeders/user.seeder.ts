import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import { SeederOptions } from './index';

export async function seedUsers(options: SeederOptions) {
  const users = [];

  // Создаем тестового администратора
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await User.create({
    email: 'admin@example.com',
    password: adminPassword,
    isPro: true,
  });
  users.push(admin);
  console.log(`👤 Admin user created: ${admin.email}`);

  // Создаем обычных пользователей
  for (let i = 0; i < options.usersCount; i++) {
    const password = await bcrypt.hash('password123', 10);
    const user = await User.create({
      email: faker.internet.email(),
      password: password,
      isPro: faker.datatype.boolean({ probability: 0.3 }),
    });
    users.push(user);
  }

  return users;
}