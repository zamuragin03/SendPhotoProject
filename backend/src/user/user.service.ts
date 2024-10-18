import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon2 from "argon2";
import { ProfileTypeService } from "src/profile-type/profile-type.service";
@Injectable()
export class UserService {
  @InjectRepository(User) userRepository: Repository<User>;
  constructor(private profileTypeService: ProfileTypeService) {}
  async create(createUserDto: CreateUserDto) {
    const isExist = await this.userRepository.countBy({ email: createUserDto.email });
    if (isExist > 0) throw new BadRequestException("Пользователь уже существует");

    const user = this.userRepository.create();
    user.email = createUserDto.email;
    user.password = await argon2.hash(createUserDto.password);
    user.login = createUserDto.login;
    user.profileType = await this.profileTypeService.getInitialState();
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
