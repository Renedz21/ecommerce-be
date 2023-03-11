import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepository.find();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {

      const category = await this.categoryRepository.findOne({
        where: {
          id
        }
      });
      const updatedCategory = Object.assign(category, updateCategoryDto);
      await this.categoryRepository.save(updatedCategory);
      return updatedCategory;

    } catch (error) {

    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
