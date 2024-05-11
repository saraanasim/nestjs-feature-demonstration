import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager) { }
  async create(createItemDto: CreateItemDto) {
    try {
      const listing = new Listing({ ...createItemDto.listing })
      const item = new Item({ ...createItemDto, listing, comments: [] })
      return await this.entityManager.save(item)
    }
    catch (error) {
      console.error(error)
      throw new BadRequestException(error.message)

    }
  }

  async findAll() {
    try {
      return await this.itemsRepository.find({ relations: { listing: true, comments: true } })
    }
    catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      return await this.itemsRepository.findOne({ where: { id }, relations: { listing: true, comments: true } })
    }
    catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      const existingItem = await this.findOne(id)
      Object.assign(existingItem, updateItemDto)

      if (updateItemDto?.comments?.length) {
        const comments = updateItemDto.comments.map((each) => new Comment(each))
        existingItem.comments = comments
      }
      if (updateItemDto?.tags?.length) {
        const tags = updateItemDto.tags.map((each) => new Tag(each))
        existingItem.tags = tags
      }

      return await this.entityManager.save(existingItem)
    }
    catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const itemToRemove = await this.findOne(id);
      if (!itemToRemove) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return await this.entityManager.remove(itemToRemove);

    }
    catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async transactionUpdate(id: number, updateItemDto: UpdateItemDto){
    await this.entityManager.transaction(async(transactionEntityManager)=>{
      const existingItem = await this.findOne(id)
      Object.assign(existingItem, updateItemDto)

      if (updateItemDto?.comments?.length) {
        const comments = updateItemDto.comments.map((each) => new Comment(each))
        existingItem.comments = comments
      }
      if (updateItemDto?.tags?.length) {
        const tags = updateItemDto.tags.map((each) => new Tag(each))
        existingItem.tags = tags
      }

      await transactionEntityManager.save(existingItem)

      throw new Error()

      //do some operation

    })
  }
}
