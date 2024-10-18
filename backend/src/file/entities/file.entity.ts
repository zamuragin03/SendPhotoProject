import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { mediaType } from "./mediaType.enum";
import { Folder } from "src/folder/entities/folder.entity";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({ type: "enum", enum: mediaType, nullable: false })
  mediaType: mediaType;

  @ManyToMany(() => Folder, (folder) => folder.files, { onDelete: "SET NULL" })
  users: Folder[];
}
