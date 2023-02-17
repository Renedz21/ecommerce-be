import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
