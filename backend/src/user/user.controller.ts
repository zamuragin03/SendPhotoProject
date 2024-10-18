import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/additionals/guards/jwt-auth.guard";
import { multerConfigForPhotos } from "src/configurations/multerConfigAsync";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Create a new user" })
  @ApiBody({ type: CreateUserDto })
  @Post("register_user")
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @Get("get_all_users")
  async findAll(): Promise<Array<User>> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: "Update user data" })
  @ApiBearerAuth()
  @ApiParam({ name: "id", description: "User ID" })
  @Patch("update_user/:id")
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Update user profile photo" })
  @ApiBearerAuth("access_token") // Добавляем аутентификацию через Bearer Token
  @ApiConsumes("multipart/form-data") // Указываем тип контента для загрузки файла
  @ApiParam({ name: "id", description: "User ID" }) // Описываем параметр ID пользователя
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary", // Указываем, что ожидается файл
        },
      },
    },
  })
  @Patch("update_photo/:id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file", multerConfigForPhotos))
  async AddPhotos(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: string
  ) {
    return await this.userService.addProfilePhoto(id, file);
  }

  @ApiOperation({ summary: "Удаление фотографии пользователя" })
  @ApiBearerAuth("access_token")
  @ApiParam({ name: "id", description: "User ID" })
  @UseGuards(JwtAuthGuard)
  @Delete("delete_photo/:id")
  async deleteProfilePhoto(@Param("id") id: string) {
    return await this.userService.deleteProfilePhoto(id);
  }
}
