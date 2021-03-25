import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(registerDTO: RegisterDTO): Promise<void> {
    return this.userRepository.signUp(registerDTO);
  }

  async signIn(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(loginDTO);
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async getUserDetails(username: string) {
    return await this.userRepository.findOne({ username });
  }
}
