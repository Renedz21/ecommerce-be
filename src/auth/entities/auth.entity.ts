import { Cart } from 'src/cart/entities/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text')
    address: string;

    @Column('text')
    phone: string;

    @Column('text', {
        unique: true,
    })
    dni: string;

    @OneToMany(() => Cart, cart => cart.user)
    @JoinColumn({ name: 'userId' })
    carts: Cart[];

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('bool', {
        default: false,
    })
    isAdmin: boolean;

    @Column('bool', {
        default: false,
    })
    deleted: boolean;
}
