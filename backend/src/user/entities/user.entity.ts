import { ProfileType } from "src/profile-type/entities/profile-type.entity";
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
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  balance: string;

  @Column({ default: null })
  photo: string;

  @Column({ default: null })
  description: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @ManyToOne(() => ProfileType, (ptype) => ptype.user, { nullable: false })
  @JoinColumn()
  profileType: ProfileType;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: string;
}
