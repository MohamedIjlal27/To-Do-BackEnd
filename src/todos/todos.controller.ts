import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The task has been successfully created.',
    type: Todo 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get('list')
  @ApiOperation({ summary: 'Get pending tasks with optional limit' })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    type: Number,
    description: 'Number of tasks to return (default: all tasks)'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return pending tasks.',
    type: [Todo]
  })
  findAll(@Query('limit') limit?: number): Promise<Todo[]> {
    return this.todosService.findAll(limit);
  }

  @Get('view/:id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiParam({ name: 'id', description: 'The id of the task' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return the task.',
    type: Todo 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Task not found.' 
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Patch('edit/:id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'The id of the task' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The task has been successfully updated.',
    type: Todo 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Task not found.' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }

  @Patch('complete/:id')
  @ApiOperation({ summary: 'Mark a task as completed' })
  @ApiParam({ name: 'id', description: 'The id of the task' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The task has been successfully marked as completed.',
    type: Todo 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Task not found.' 
  })
  markAsCompleted(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.markAsCompleted(id);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'The id of the task' })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'The task has been successfully deleted.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Task not found.' 
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todosService.remove(id);
  }
} 