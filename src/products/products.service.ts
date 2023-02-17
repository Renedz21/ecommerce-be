import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {

      console.log(createProductDto);
      const { categoryId, ...data } = createProductDto;

      const product = this.productRepository.create({
        ...data,
        category: {
          id: categoryId
        }
      });

      const newProduct = await this.productRepository.save(product);
      console.log(newProduct);
      return { ...newProduct, category: { id: categoryId } };


    } catch (error) {
      console.log(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const { limit = 10, offset = 0 } = paginationDto;

      const products = await this.productRepository.find({
        relations: [
          'category'
        ],
        take: limit,
        skip: offset
      });

      return products;

    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {

    try {

      const product = await this.productRepository.findOne({
        where: {
          id: id
        }
      });
      return product;

    } catch (error) {

    }

  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
