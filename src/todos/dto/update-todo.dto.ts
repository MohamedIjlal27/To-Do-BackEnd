import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete project documentation',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Write API documentation and update README',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
} 