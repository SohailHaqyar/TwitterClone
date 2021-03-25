import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { User } from './user.entity';
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validateUserPassword(loginDTO: LoginDTO): Promise<string> {
    const { username, password } = loginDTO;

    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
  async signUp(registerDTO: RegisterDTO): Promise<void> {
    const { username, password, email } = registerDTO;

    const user = new User();
    const avatar = gravatar.url(email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', // Default
      protocol: 'https',
    });
    user.avatar = avatar;
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
