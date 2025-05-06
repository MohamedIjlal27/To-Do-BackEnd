import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: 'Buy milk, eggs, and bread',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
} 