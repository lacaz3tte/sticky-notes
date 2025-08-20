import { faker } from '@faker-js/faker';
import Tag from '../models/tag.model';
import User from '../models/user.model';
import { SeederOptions } from './index';
import { TAG_COLORS, TAG_NAMES } from './utils';

export async function seedTags(options: SeederOptions, users: User[]) {
  const tags = [];

  for (const user of users) {
    const tagsToCreate = Math.min(options.tagsPerUser, TAG_NAMES.length);
    
    for (let i = 0; i < tagsToCreate; i++) {
      const tagName = TAG_NAMES[i % TAG_NAMES.length];
      const tag = await Tag.create({
        name: `${tagName}${i > 0 ? ` ${i + 1}` : ''}`,
        color: TAG_COLORS[i % TAG_COLORS.length],
        userId: user.id,
      });
      tags.push(tag);
    }
  }

  return tags;
}