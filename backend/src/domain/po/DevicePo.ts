import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class DevicePo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}
export default DevicePo