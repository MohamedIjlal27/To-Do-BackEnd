import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete project documentation',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Write API documentation and update README',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: 'pending',
    enum: ['pending', 'completed'],
    default: 'pending'
  })
  @IsOptional()
  @IsEnum(['pending', 'completed'])
  status?: 'pending' | 'completed';
} 