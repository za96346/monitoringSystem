import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}
export default UserEntity