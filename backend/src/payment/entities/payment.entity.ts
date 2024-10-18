import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: string;
}
