import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: "Некорректный email" })
  email: string;

  @ApiProperty({
    description: 'User login',
    example: 'user123',
  })
  @IsString({ message: "Необходимо придумать логин" })
  @MinLength(5, { message: "Слишком короткий логин" })
  @MaxLength(20, { message: "Слишком длинный логин" })
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @MinLength(6, { message: "Пароль должен быть больше 6 символов" })
  @IsString({ message: "Необходимо придумать пароль" })
  password: string;
}
