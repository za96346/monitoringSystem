import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "device_data" })
class DeviceDataPo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true, comment: "裝置ID" })
  device_id: number;

  @Column({ type: "text", nullable: true, comment: "收集到的json 資料" })
  data: string;

  @UpdateDateColumn({ type: "timestamp", nullable: true, comment: "更新時間" })
  update_time: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true, comment: "創建時間" })
  create_time: Date;
}

export default DeviceDataPo