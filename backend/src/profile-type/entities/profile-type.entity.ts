import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfileType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  isVerified: boolean;

  @OneToMany(() => User, (user) => user.profileType)
  @JoinTable()
  user: User[];
}
