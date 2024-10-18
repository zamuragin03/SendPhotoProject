import { File } from "src/file/entities/file.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => File)
  @JoinTable()
  files: File[];

  @OneToMany(() => Transaction, (transaction) => transaction.folder)
  @JoinTable()
  transaction: Transaction[];

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: string;
}
