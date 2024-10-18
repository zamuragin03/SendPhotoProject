import { Module } from "@nestjs/common";
import { ProfileTypeService } from "./profile-type.service";
import { ProfileTypeController } from "./profile-type.controller";
import { ProfileType } from "./entities/profile-type.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileType]),],
  controllers: [ProfileTypeController],
  providers: [ProfileTypeService],
  exports: [ProfileTypeService],
})
export class ProfileTypeModule {}
