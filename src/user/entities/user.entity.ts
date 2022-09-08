import {UserRole} from "../../utils/enums/enum-roles.enum";
import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

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

    @Column({type: "enum", enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @BeforeInsert()
    async lowerCaseAndSpaces() {
        this.email = this.email.toLowerCase()
        this.email = this.email.replace(/\s/g, '')
    }

    /*@BeforeInsert()
    async encrypt() {
        this.password = await bcrypt.hash(this.password, 10);
    }*/

}
