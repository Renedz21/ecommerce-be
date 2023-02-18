import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { CartItem } from './cartItem.entity';
import { User } from 'src/auth/entities/auth.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.carts)
    user: User;

    @OneToMany(() => CartItem, (item) => item.cart)
    items: CartItem[];

}