import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'varchar', length: 250})
    name: string;

    @Column({type: 'varchar', length: 250})
    category: string;

    @Column({type: 'integer'})
    price: number;
}
