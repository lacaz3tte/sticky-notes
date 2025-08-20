import Tag from '../models/tag.model';
import StickyNote from '../models/sticky-note.model';
import { CreateTagDto, UpdateTagDto } from '../dtos/tag.dto';
import { NotFoundException, ForbiddenException } from '../exceptions';

class TagService {
  async getAllTags(userId: string) {
    return Tag.findAll({
      where: { userId },
      order: [['name', 'ASC']],
    });
  }

  async getTagById(id: string, userId: string) {
    const tag = await Tag.findByPk(id);
    
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (tag.userId !== userId) {
      throw new ForbiddenException('You are not allowed to access this tag');
    }

    return tag;
  }

  async createTag(data: CreateTagDto, userId: string) {
    return Tag.create({
      ...data,
      userId,
    });
  }

  async updateTag(id: string, data: UpdateTagDto, userId: string) {
    const tag = await this.getTagById(id, userId);
    return tag.update(data);
  }

  async deleteTag(id: string, userId: string) {
    const tag = await this.getTagById(id, userId);
    await tag.destroy();
  }

  async getStickyNotesByTag(tagId: string, userId: string) {
    const tag = await this.getTagById(tagId, userId);
    
    return StickyNote.findAll({
      include: [{
        association: 'tags',
        where: { id: tagId },
        through: { attributes: [] },
      }],
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new TagService();