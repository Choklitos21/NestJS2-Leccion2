import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { UserRoles}  from "../../utils/enums/enum-roles.enum";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 250, unique: true})
    email: string;

    @Column({type: 'varchar', length: 250})
    full_name: string;

    @Column({type: 'varchar', length: 250})
    password: string;

    @Column({type: 'boolean', default: true})
    active: boolean;

    @Column({type: "text", array: true, nullable: true, default:[`${UserRoles.USER}`]})
    role: string[];

    @OneToMany(() => Product, (product) => product.user)
    product: Product;

}
