import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/auth/entities/auth.entity';
import { CartDto } from './dto/cart.dto';
import { Request } from 'express';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) { }

  async saveCart(cart: any, userId: any) {

    console.log('userId', userId.userId)
    console.log('cart', cart);

    try {
      const existedCart = await this.cartRepository.findOne({
        where: { user: { id: userId.userId } },
      });

      console.log('existedCart', existedCart.id);

      if (existedCart) {
        cart.forEach(async (element: any) => {
          this.addToCart(element, existedCart.id);
        });

      } else {
        const newCart = new Cart();
        newCart.user = userId.userId;
        const createNewCart = this.cartRepository.create(newCart);
        await this.cartRepository.save(createNewCart);
      }

      cart.forEach(async (element: any) => {

        const cartItem = new CartItem();

        const product = await this.cartItemRepository.findOne({ where: { product: element.id } });

        if (product) {
          product.quantity = element.quantity;
          await this.cartItemRepository.save(product);
        } else {
          cartItem.product = element.id;
          cartItem.quantity = element.quantity;
          cartItem.cart = existedCart;
          await this.cartItemRepository.save(cartItem);
        }

      });
      return {
        message: 'Cart updated successfully',

      };

    } catch (error) {
      console.log(error);
    }
  }

  private async addToCart(element: any, cartId: any) {
    const cartItem = new CartItem();
    cartItem.product = element.id;
    cartItem.cart = cartId;
    cartItem.quantity = element.quantity;
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

}
