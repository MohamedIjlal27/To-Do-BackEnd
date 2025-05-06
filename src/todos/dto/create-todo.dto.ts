import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: 'Buy milk, eggs, and bread',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: false,
    required: false,
  })
  @IsOptional()
  completed?: boolean;
} 