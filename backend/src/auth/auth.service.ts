import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { IAuthenticatedData } from "./dto/IAuthenticatedData";
import { LoginDTO } from "./dto/Login.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private config: ConfigService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException({}, "Неверный логин или пароль");
    
    const PasswordIsMatch = await argon2.verify(user.password, pass);

    if (user && PasswordIsMatch) {
      return user;
    }
    throw new UnauthorizedException({}, "Неверный логин или пароль");
  }

  async refresh(user: any, refresh_token) {
    const payload = {
      email: user.email,
      id: user.id,
      created_at: user.created_at,
    };

    const at = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>("JWT_SECRET"),
      expiresIn: "15m",
    });

    return {
      id: user.id,
      email: payload.email,
      refresh_token: refresh_token,
      access_token: at,
    };
  }

  async login(loginDTO: LoginDTO): Promise<IAuthenticatedData> {
    const findUser = await this.userService.findOneByEmail(loginDTO.email);
    const payload = {
      id: findUser.id,
      email: findUser.email,
      created_at: findUser.created_at,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>("JWT_SECRET"),
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>("JWT_SECRET"),
        expiresIn: "15 days",
      }),
    ]);

    return {
      id: findUser.id,
      email: findUser.email,
      access_token: at,
      refresh_token: rt,
    };
  }
}
