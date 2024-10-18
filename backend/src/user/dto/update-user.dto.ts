import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    description: 'Login of the user',
    example: 'user123',
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Необходимо придумать логин" })
  @MinLength(5, { message: "Слишком короткий логин" })
  @MaxLength(20, { message: "Слишком длинный логин" })
  login: string;

  @ApiProperty({
    description: 'User description',
    example: 'A brief bio about the user.',
    required: false,
  })
  @IsOptional()
  @MaxLength(200, { message: "Максимальная длинна 200 символов" })
  @MinLength(1, { message: "Минимальная длинна 1 символ" })
  description: string;
}
