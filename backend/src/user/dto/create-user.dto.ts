import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Некорректный email" })
  email: string;

  @IsString({ message: "Необходимо придумать пароль" })
  @MinLength(5, { message: "Слишком короткий логин" })
  @MaxLength(20, { message: "Слишком длинный логин" })
  login: string;

  @MinLength(6, { message: "Пароль должен быть больше 6 символов" })
  @IsString({ message: "Необходимо придумать пароль" })
  password: string;
}
