import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User) {
    return user;
  }
  @Post('/signup')
  signUp(@Body(ValidationPipe) registerDTO: RegisterDTO): Promise<void> {
    return this.authService.signUp(registerDTO);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) loginDTO: LoginDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginDTO);
  }
}
