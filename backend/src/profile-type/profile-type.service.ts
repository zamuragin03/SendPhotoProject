import { Injectable } from "@nestjs/common";
import { CreateProfileTypeDto } from "./dto/create-profile-type.dto";
import { UpdateProfileTypeDto } from "./dto/update-profile-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileType } from "./entities/profile-type.entity";
import { Repository } from "typeorm";
import { INITIAL_STATE } from "./const";

@Injectable()
export class ProfileTypeService {
  @InjectRepository(ProfileType) pTypeRepository: Repository<ProfileType>;
  findAll() {
    return `This action returns all profileType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileType`;
  }

  update(id: number, updateProfileTypeDto: UpdateProfileTypeDto) {
    return `This action updates a #${id} profileType`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileType`;
  }
  async getInitialState() {
    let initialState = await this.pTypeRepository.findOneBy(INITIAL_STATE);

    if (!initialState) {
      initialState = this.pTypeRepository.create(INITIAL_STATE);
      await this.pTypeRepository.save(initialState);
    }

    return initialState;
  }
}
