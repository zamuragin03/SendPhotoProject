import { Folder } from "src/folder/entities/folder.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  seller: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  payer: User;

  @ManyToOne(() => Folder, (folder) => folder.transaction, { nullable: false })
  @JoinColumn()
  folder: Folder;

  @Column()
  amount: number;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: string;
}
