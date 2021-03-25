import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    const { body, title } = createPostDto;
    const post = new PostEntity();
    post.title = title;
    post.body = body;
    post.user = user;
    await post.save();

    delete post.user;
    return post;
  }

  async findAll() {
    return await this.postRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: string) {
    const result = await this.postRepository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async checkOwnership(id: string, userId: number) {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException();
    if (post.user.id === userId) {
      return true;
    } else {
      return false;
    }
  }
  async remove(id: string, user: User) {
    // Check if the post belongs to the user.
    const isOwner = await this.checkOwnership(id, user.id);
    if (isOwner) {
      await this.postRepository.delete(id);
    } else {
      throw new UnauthorizedException();
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto, user: User) {
    // Check if the post belongs this user
    const isOwner = await this.checkOwnership(id, user.id);
    if (isOwner) {
      await this.postRepository.update(id, updatePostDto);
    } else {
      throw new UnauthorizedException();
    }
  }
}
