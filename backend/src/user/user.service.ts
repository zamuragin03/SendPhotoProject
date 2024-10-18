import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as path from "path";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon2 from "argon2";
import { ProfileTypeService } from "src/profile-type/profile-type.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as fs from "fs";
@Injectable()
export class UserService {
  @InjectRepository(User) userRepository: Repository<User>;
  constructor(private profileTypeService: ProfileTypeService) {}
  async create(createUserDto: CreateUserDto) {
    const isExist = await this.userRepository.countBy({
      email: createUserDto.email,
    });
    if (isExist > 0)
      throw new BadRequestException("Пользователь уже существует");

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.login) {
      const existingUser = await this.userRepository.findOne({
        where: { login: updateUserDto.login },
      });

      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException(
          "Логин уже используется другим пользователем"
        );
      }
    }

    const newUser = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!newUser) {
      throw new NotFoundException("Пользователь не найден");
    }

    await this.userRepository.save(newUser);
  }

  async addProfilePhoto(id: string, file: Express.Multer.File) {
    if (!file) {
      return new BadRequestException("Файл не был загружен");
    }
    const userProfile = await this.userRepository.findOneBy({ id });
    userProfile.photo = file.path;
    return await this.userRepository.save(userProfile);
  }
  async deleteProfilePhoto(id: string): Promise<User> {
    // Найти пользователя
    const user = await this.userRepository.findOneBy({ id });

    if (!user.photo) {
      throw new NotFoundException("Фото не найдено");
    }

    const mediaPath = `./user_photos/${id}`;

    // Проверяем, существует ли папка
    if (fs.existsSync(mediaPath)) {
      const files = fs.readdirSync(mediaPath);
      const imageFiles = files.filter((f) =>
        [".jpeg", ".png", ".jpg"].includes(path.extname(f))
      );

      // Удаление всех изображений в папке
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          const filePath = path.join(mediaPath, file);
          fs.unlinkSync(filePath); // Удаление каждого файла
        });

        // Удаление самой папки, если она пуста
        fs.rmdirSync(mediaPath);
      }
    } else {
      throw new HttpException(
        "Photo directory not found.",
        HttpStatus.NOT_FOUND
      );
    }

    user.photo = null;
    return await this.userRepository.save(user);
  }
}
