import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo task' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The todo task has been successfully created.',
    type: Todo 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todo tasks' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return all todo tasks.',
    type: [Todo]
  })
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo task by id' })
  @ApiParam({ name: 'id', description: 'The id of the todo task' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return the todo task.',
    type: Todo 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Todo task not found.' 
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo task' })
  @ApiParam({ name: 'id', description: 'The id of the todo task' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The todo task has been successfully updated.',
    type: Todo 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Todo task not found.' 
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo task' })
  @ApiParam({ name: 'id', description: 'The id of the todo task' })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'The todo task has been successfully deleted.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Todo task not found.' 
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todosService.remove(id);
  }
} 