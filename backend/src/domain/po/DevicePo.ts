import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "device" })
class DevicePo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: true, comment: "使用者名稱" })
  device_name: string;

  @Column({ type: "int", default: 0 })
  sort: number;

  @Column({ type: "int", default: 0, comment: "是否被刪除" })
  is_deleted: number;

  @Column({ type: "int", default: 0, comment: "是否被停用" })
  is_stopped: number;

  @UpdateDateColumn({ type: "timestamp", nullable: true, comment: "更新時間" })
  update_time: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true, comment: "創建時間" })
  create_time: Date;
}

export default DevicePo