import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;
}
