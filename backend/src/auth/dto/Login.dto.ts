import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
  email: string;
  password: string;
}
