import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { ProfileTypeModule } from "src/profile-type/profile-type.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfileTypeModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
