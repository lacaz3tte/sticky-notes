import { Faker } from '@faker-js/faker';

export interface SeederOptions {
  usersCount: number;
  tagsPerUser: number;
  notesPerUser: number;
  tagsPerNote: number;
}

export const defaultSeederOptions: SeederOptions = {
  usersCount: 5,
  tagsPerUser: 8,
  notesPerUser: 20,
  tagsPerNote: 3,
};

export type EntitySeeder<T> = (faker: Faker, options: SeederOptions) => Promise<T>;