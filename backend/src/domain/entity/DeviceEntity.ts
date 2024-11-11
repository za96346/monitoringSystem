import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class DeviceEntity {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = "";

    @Column()
    email: string = "";
}

export default DeviceEntity