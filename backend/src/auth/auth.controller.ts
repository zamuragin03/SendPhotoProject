import { Controller, Request, Post, UseGuards, Get, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "src/additionals/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/additionals/guards/local-auth.guard";
import { RtGuard } from "src/additionals/guards/access-token.guard";
import { getCurrentUser } from "src/additionals/decorators/current-user.decorator";
import { LoginDTO } from "./dto/Login.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDTO })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(RtGuard)
  @Post("refresh")
  async refresh(@Request() req, @getCurrentUser("refresh_token") refresh_token: string) {
    return await this.authService.refresh(req.user, refresh_token);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    return await req.user;
  }
}
