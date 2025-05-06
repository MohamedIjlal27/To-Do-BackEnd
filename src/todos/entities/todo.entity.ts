import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('task')
export class Todo {
  @ApiProperty({
    description: 'The unique identifier of the task',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete project documentation',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Write API documentation and update README',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: 'pending',
    enum: ['pending', 'in_progress', 'completed'],
  })
  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  })
  status: string;

  @ApiProperty({
    description: 'The priority of the task',
    example: 'high',
    enum: ['low', 'medium', 'high'],
  })
  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  })
  priority: string;

  @ApiProperty({
    description: 'The due date of the task',
    example: '2024-05-10T00:00:00Z',
    required: false,
  })
  @Column({ type: 'datetime', nullable: true })
  dueDate: Date;

  @ApiProperty({
    description: 'The date when the task was created',
    example: '2024-05-05T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the task was last updated',
    example: '2024-05-05T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
} 