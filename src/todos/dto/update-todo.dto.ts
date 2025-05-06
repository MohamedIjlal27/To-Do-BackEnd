import { IsOptional, IsString, IsEnum } from 'class-validator';
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

  @ApiProperty({
    description: 'The status of the task',
    example: 'completed',
    enum: ['pending', 'completed'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['pending', 'completed'])
  status?: 'pending' | 'completed';
} 