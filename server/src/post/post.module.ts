import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PassportModule } from '@nestjs/passport';
import { PostController } from './post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
