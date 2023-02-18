import { CartItem } from "src/cart/entities/cartItem.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    })
    name: string;

    @Column('text')
    description: string;

    @Column('numeric')
    price: number;

    @Column('numeric', {
        default: 0
    })
    stock: number;

    @Column('text')
    image: string;

    @OneToMany(() => CartItem, item => item.product)
    cartItems: CartItem[];

    @ManyToOne(() => Category, category => category.product)
    category: Category;

    @Column('boolean', {
        default: true
    })
    isAvailable: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
