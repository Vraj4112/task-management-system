# Task Avian soft

---

## Important Notes

- **IDE**: vsCode is recommended. This app uses design patterns(modular monolith) for scalability.
- **ORM**: this project is implemented using sequelise orm

---

## Prerequisites

Ensure you have the following software installed:

- Node.js (>= 14.x)
- npm (Node Package Manager)
- MySQL local server to run local instance of MySQL Db and MySQL Workbench(GUI) for managing database

---

## Getting Started

### 1. Install Dependencies

```bash
npm install --include=dev
```

#### Also includes dev dependencies. If we are setting the environmnt for development or testing

#### run below script ,will set Node js environment to deveopment or test by running script. This will set to environment variable to development file

```bash
$env:NODE_ENV="development"
```

### 2. Setup environment variables Configuration

- create environment file use below command also create.env and .env.test file as per requiremrnts

```bash
echo "" >> .env.development
```

- change database credentials In accordingly In node application inside .env file (dotenv) configuration for testing provide all variable including enc_key and enc_iv used to encrypt the contact number
- below are credential provided you have to change this accordingly as per you mysql db credentials

```plaintext
PORT=3002
DATABASE=db_task_aviansoft
DB_USER=root
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=fodjfojdf
SESSION_SECRET_KEY=foo
COOKIE_PARSER_SECRET_KEY=foo
```

### 3. Run Task

- Run below script to run the task

```bash
npm run start
```

- this should start server on http://localhost:3002
- it will auto generate database "db_task_aviansoft".

### 9. API Endpoints

- I have also attached postman_collection in same task. You can use that by importing that collection and i have provided all details as below to use app.

#### List all api endpoints - user authentication:

- user authentication

```http
/api/auth/register -register user
```

- Request json

```json
{
  "name": "vraj",
  "email": "vraj@gmail.com",
  "password": "123456",
  "role": "USER" //ADMIN or USER
}
```

```http
/api/auth/login - login user
```

- Request json

```json
{
  "email": "vraj@gmail.com",
  "password": "123456"
}
```

- Main task routes

```http
POST- /api/tasks/ -create main task
```

- Request json

```json
{
  "title": "test task",
  "description": "this is a test task",
  "status": "Pending", // "Pending", "In Progress", "Completed"
  "dueDate": "2025-03-12",
  "priority": "Low" //"Low", "Medium", "High"
}
```

```http
GET- /api/tasks?page=1&limit=10 -get list of all main task of logged in user
```

```http
GET- /api/tasks/:id -get perticulat main task by id
```

```http
PUT- /api/tasks/:id -update main task with ID
```

- Request json

```json
{
  "title": "vraj vraj",
  "description": "this is a test task",
  "status": "In Progress", // "Pending", "In Progress", "Completed"
  "dueDate": "2025-03-20",
  "priority": "Medium" //"Low", "Medium", "High"
}
```

```http
DELETE- /api/tasks/:id -delete Main task with ID
```

- Sub task routes

```http
POST- /api/tasks/:mainTaskId/child-tasks -create sub tasks
```

- Request json

```json
{
  "title": "sub task test",
  "description": "this is dev test",
  "status": "Pending", //"Pending", "In Progress", "Completed"
  "dueDate": "2025-03-11",
  "priority": "Medium" //"Low", "Medium", "High"
}
```

```http
GET- /api/tasks/:mainTaskId/child-tasks?page=1&limit=10 - get all sub tasks of perticular main task
```

```http
PUT- /api/tasks/:mainTaskId/child-tasks/:childTaskId -update sub task
```

- Request json

```json
{
  "title": "update update",
  "description": "update is dev test",
  "status": "In Progress", //"Pending", "In Progress", "Completed"
  "dueDate": "2025-03-12",
  "priority": "Medium" //"Low", "Medium", "High"
}
```

```http
DELETE- /api/tasks/:mainTaskId/child-tasks/:childTaskId -delete sub task
```
