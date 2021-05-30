import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { PostEntity } from 'src/post/entities/post.entity';
@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => PostEntity, (post) => post.user, { eager: false })
  post: PostEntity[];
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  @Column()
  avatar: string;
}
