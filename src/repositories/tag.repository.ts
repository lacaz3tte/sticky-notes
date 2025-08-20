import Tag from '../models/tag.model';
import { CreateTagDto, UpdateTagDto } from '../dtos/tag.dto';
import { NotFoundException } from '../exceptions';

class TagRepository {
  async findAll(userId: string) {
    return Tag.findAll({
      where: { userId },
      order: [['name', 'ASC']],
    });
  }

  async findById(id: string) {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async create(data: CreateTagDto & { userId: string }) {
    return Tag.create(data);
  }

  async update(id: string, data: UpdateTagDto) {
    const tag = await this.findById(id);
    return tag.update(data);
  }

  async delete(id: string) {
    const tag = await this.findById(id);
    await tag.destroy();
  }

  async findByName(name: string, userId: string) {
    return Tag.findOne({
      where: { name, userId },
    });
  }

  async getWithStickyNotes(tagId: string) {
    return Tag.findByPk(tagId, {
      include: [{
        association: 'stickyNotes',
        through: { attributes: [] },
      }],
    });
  }
}

export default new TagRepository();