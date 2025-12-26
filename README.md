# Task Management API

A simple, RESTful API built with Node.js and Express.js for managing tasks. This application uses in-memory data storage to perform CRUD operations, complete with input validation, sorting, filtering, and priority management.

## Features

* **CRUD Operations:** Create, Read, Update, and Delete tasks.
* **Input Validation:** Ensures data integrity for required fields and data types.
* **Filtering:** Filter tasks based on completion status.
* **Sorting:** Sort tasks by creation date.
* **Priority Levels:** Assign and retrieve tasks based on priority (low, medium, high).

## Prerequisites

Before you begin, ensure you have met the following requirements:

* **Node.js** (v14 or higher recommended)
* **npm** (Node Package Manager)

## Setup & Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd <your-repo-folder>

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the server:**
```bash
node app.js
# OR if you have nodemon installed
npm run dev

```


The server will start on `http://localhost:3000`.

---

## API Documentation

### 1. Get All Tasks

Retrieve a list of all tasks. Supports filtering and sorting.

* **URL:** `/tasks`
* **Method:** `GET`
* **Query Parameters (Optional):**
* `completed`: Filter by status (`true` or `false`).
* `sortBy`: Sort by creation time (`creationDate`).


* **Example Requests:**
* Get all: `GET /tasks`
* Filter completed: `GET /tasks?completed=true`
* Sort by date: `GET /tasks?sortBy=creationDate`



### 2. Get Task by ID

Retrieve details of a specific task.

* **URL:** `/tasks/:id`
* **Method:** `GET`
* **Success Response:** `200 OK` with task object.
* **Error Response:** `404 Not Found` if ID does not exist.

### 3. Get Tasks by Priority

Retrieve all tasks matching a specific priority level.

* **URL:** `/tasks/priority/:level`
* **Method:** `GET`
* **URL Params:** `level` (Options: `low`, `medium`, `high`)
* **Example:** `GET /tasks/priority/high`

### 4. Create a Task

Create a new task.

* **URL:** `/tasks`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body (Required):**
```json
{
  "title": "Finish Project",
  "description": "Complete the README file",
  "completed": false,
  "priority": "high"
}

```


*Note: `priority` must be 'low', 'medium', or 'high'.*
* **Success Response:** `201 Created`

### 5. Update a Task

Update an existing task by ID.

* **URL:** `/tasks/:id`
* **Method:** `PUT`
* **Request Body:** All fields (`title`, `description`, `completed`, `priority`) must be provided.
* **Success Response:** `200 OK`

### 6. Delete a Task

Remove a task from the system.

* **URL:** `/tasks/:id`
* **Method:** `DELETE`
* **Success Response:** `200 OK`

---

## Testing

### Automated Tests

This project includes a test suite (likely using Jest or Mocha, depending on your setup).
To run the automated tests:

```bash
npm run test

```

### Manual Testing (curl)

You can manually test the API using `curl` in your terminal:

**Create a Task:**

```bash
curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Task", "description": "Testing API", "completed": false, "priority": "medium"}'

```

**Get All Tasks:**

```bash
curl http://localhost:3000/tasks

```

**Filter by Priority:**

```bash
curl http://localhost:3000/tasks/priority/medium

```
