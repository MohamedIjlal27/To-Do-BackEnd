# NestJS Todo Backend

A RESTful API backend built with NestJS for managing todos.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=todos_db

# Application Configuration
PORT=3000
NODE_ENV=development

# API Documentation
SWAGGER_TITLE=Todo API
SWAGGER_DESCRIPTION=The Todo API documentation
SWAGGER_VERSION=1.0
SWAGGER_PATH=api
```

## API Documentation

The API documentation is available through Swagger UI. Once the application is running, you can access it at:

```
http://localhost:3000/api
```

The Swagger documentation provides:
- Interactive API documentation
- Request/Response examples
- API testing interface
- Schema definitions
- Authentication requirements (if any)

## Running with Docker

1. Build and start the containers:
```bash
docker-compose up --build
```

2. To run in detached mode:
```bash
docker-compose up -d
```

3. To stop the containers:
```bash
docker-compose down
```

## API Endpoints

### Todos

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `PATCH /todos/:id/complete` - Mark a todo as completed

## Development

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

### Running Tests

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── todos/              # Todo module
│   ├── dto/           # Data Transfer Objects
│   ├── entities/      # Database entities
│   ├── todos.controller.ts
│   └── todos.service.ts
├── app.module.ts      # Root module
└── main.ts           # Application entry point
```

## Docker Configuration

The project uses Docker Compose to manage the following services:

- NestJS application
- MYSQL database

## License

MIT

