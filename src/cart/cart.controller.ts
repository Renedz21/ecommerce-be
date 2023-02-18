import { Controller, Get, Post, Put, Param, Delete, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { Product } from 'src/products/entities/product.entity';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { CartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {

  constructor(private readonly cartService: CartService) { }

  @Post(':userId')
  async saveCart(@Param() userId: any, @Body() cart: CartDto) {
    return this.cartService.saveCart(cart, userId);
  }

}
