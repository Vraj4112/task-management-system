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

#### By running below script, will set Node js environment to development or test by running script. This will set to environment variable to development in file. This is windows terminal command. It defers in macOS and Linux.

```bash
$env:NODE_ENV="development"
```

### 2. Setup environment variables Configuration

- create environment file use below command also create **.env** and **.env.test** file as per requirements.
- For example:-

```bash
echo "" >> .env.development
```

- change database credentials In accordingly In node application inside .env file (dotenv) configuration for testing provide all variable.
- below are credential provided you have to change this accordingly as per you mysql db credentials

```plaintext
PORT=3002
DATABASE=db_task_aviansoft
DB_USER=root
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=fodjfojdf
```

### 3. Run Task

- Run below script to run the task

```bash
npm run start
```

- this should start server on http://localhost:3002
- it will auto generate database "db_task_aviansoft".

### 9. API Endpoints

- I have also attached postman collection in same directory with name "_postman_collection_". You can use that by importing that collection and i have provided all details as below to use app.

### 10. List of All API Endpoints

---

#### 1. user authentication

- POST -register user

```http
/api/auth/register
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

- POST -login user

```http
/api/auth/login
```

- Request json

```json
{
  "email": "vraj@gmail.com",
  "password": "123456"
}
```

---

---

#### 2. Main task routes

- POST -create main task

```http
/api/tasks/
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

- GET -get list of all main task of logged in user

```http
/api/tasks?page=1&limit=10
```

- GET -get perticulat main task by id

```http
/api/tasks/:id
```

- PUT -update main task with ID

```http
 /api/tasks/:id
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

- DELETE -delete Main task with ID

```http
 /api/tasks/:id
```

---

---

#### 3. Sub task routes

- POST -create sub tasks

```http
/api/tasks/:mainTaskId/child-tasks
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

- GET -get all sub tasks of perticular main task

```http
/api/tasks/:mainTaskId/child-tasks?page=1&limit=10
```

- PUT -update sub task

```http
/api/tasks/:mainTaskId/child-tasks/:childTaskId
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

- DELETE -delete sub task

```http
/api/tasks/:mainTaskId/child-tasks/:childTaskId
```

---

### 11. CI/CD Pipeline process

- **Trigger:** The pipeline runs automatically on every push or pull_request to the main branch.
- **Checkout Code:** It fetches your repository’s code.
- **Set up Node.js:** Installs the required Node.jsversion.
- **Install Dependencies:** Installs all project dependencies using npm install.
- **Run ESLint:** Lints the entire codebase for errors and warnings.
- **Run Unit Tests:** Executes your tests to verify the application behavior.
- **Additionally:** We can expand on this further, like adding build steps or deployment!.
