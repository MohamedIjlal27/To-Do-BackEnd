import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      status: createTodoDto.status || 'pending'
    });
    return await this.todosRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.find({
      where: { status: 'pending' },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return await this.todosRepository.save(todo);
  }

  async markAsCompleted(id: number): Promise<Todo> {
    const todo = await this.findOne(id);
    todo.status = 'completed';
    return await this.todosRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await this.todosRepository.remove(todo);
  }
} 