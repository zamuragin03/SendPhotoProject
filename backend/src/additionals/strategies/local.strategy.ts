import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(
      email.trimEnd().trimStart(),
      password.trimEnd().trimStart()
    );
    
    if (!user) {
      throw new UnauthorizedException("Неверный логин или пароль");
    }
    return user;
  }
}
