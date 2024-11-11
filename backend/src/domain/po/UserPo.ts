import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";

@Entity({ name: "user" })
@Unique(["accout"])
class UserPo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: true, comment: "使用者名稱" })
  user_name: string;

  @Column({ type: "varchar", length: 50, nullable: true, comment: "帳號" })
  accout: string;

  @Column({ type: "varchar", length: 50, nullable: true, comment: "密碼" })
  password: string;

  @Column({ type: "int", default: 0 })
  sort: number;

  @Column({ type: "int", default: 0, comment: "是否被刪除" })
  is_deleted: number;

  @UpdateDateColumn({ type: "timestamp", nullable: true, comment: "更新時間" })
  update_time: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true, comment: "創建時間" })
  create_time: Date;
}

export default UserPo