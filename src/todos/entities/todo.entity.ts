import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('todos')
export class Todo {
  @ApiProperty({
    description: 'The unique identifier of the todo',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: 'Buy milk, eggs, and bread',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: false,
  })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({
    description: 'The date when the todo was created',
    example: '2024-05-05T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the todo was last updated',
    example: '2024-05-05T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
} 