import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodosService } from '../../src/todos/todos.service';
import { Todo } from '../../src/todos/entities/todo.entity';
import { NotFoundException } from '@nestjs/common';

describe('TodosService', () => {
  let service: TodosService;
  let repository: Repository<Todo>;

  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto = {
        title: 'Test Todo',
        description: 'Test Description',
      };

      mockRepository.create.mockReturnValue(mockTodo);
      mockRepository.save.mockResolvedValue(mockTodo);

      const result = await service.create(createTodoDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createTodoDto,
        status: 'pending',
      });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockTodo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const mockTodos = [mockTodo];
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockTodos),
      };

      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.findAll();

      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(queryBuilder.where).toHaveBeenCalledWith('todo.status = :status', { status: 'pending' });
      expect(result).toEqual(mockTodos);
    });

    it('should respect the limit parameter', async () => {
      const limit = 5;
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockTodo]),
      };

      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      await service.findAll(limit);

      expect(queryBuilder.take).toHaveBeenCalledWith(limit);
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockTodo);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockTodo);
    });

    it('should throw NotFoundException when todo is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto = {
        title: 'Updated Todo',
        description: 'Updated Description',
      };

      mockRepository.findOne.mockResolvedValue(mockTodo);
      mockRepository.save.mockResolvedValue({ ...mockTodo, ...updateTodoDto });

      const result = await service.update(1, updateTodoDto);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ ...mockTodo, ...updateTodoDto });
    });
  });

  describe('markAsCompleted', () => {
    it('should mark a todo as completed', async () => {
      mockRepository.findOne.mockResolvedValue(mockTodo);
      mockRepository.save.mockResolvedValue({ ...mockTodo, status: 'completed' });

      const result = await service.markAsCompleted(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.save).toHaveBeenCalledWith({ ...mockTodo, status: 'completed' });
      expect(result.status).toBe('completed');
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      mockRepository.findOne.mockResolvedValue(mockTodo);
      mockRepository.remove.mockResolvedValue(mockTodo);

      await service.remove(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockTodo);
    });
  });
}); 