import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager) { }
  async create(createItemDto: CreateItemDto) {
    try {
      const listing = new Listing({ ...createItemDto.listing })
      const item = new Item({ ...createItemDto, listing })
      return await this.entityManager.save(item)
    }
    catch (error) {
      console.error(error)
      throw new BadRequestException(error.message)

    }
  }

  async findAll() {
    try {
      return await this.itemsRepository.find({relations:{listing:true}})
    }
    catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      return await this.itemsRepository.findOne({where:{id},relations:{listing:false}})
    }
    catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      const existingItem = await this.findOne(id)
      Object.assign(existingItem, updateItemDto)
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
}
