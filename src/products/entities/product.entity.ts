import {
    Column,
    Entity, ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";

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

    @ManyToOne(() => User, (user) => user.product, { eager: true })
    user: User;
}
