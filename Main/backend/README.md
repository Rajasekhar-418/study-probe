# CodeMastery — Spring Boot Backend

REST API for the CodeMastery online course-selling platform.

## Tech Stack

- **Spring Boot 3.2.5** (Java 17)
- **Spring Data JPA** + Hibernate ORM
- **MySQL** database
- **Lombok** for boilerplate reduction
- **Bean Validation** for request validation

## Prerequisites

1. Java 17 or higher
2. Maven 3.8+
3. MySQL 8.0+ running on localhost:3306

## Database Setup

Create the database before first run:

```sql
CREATE DATABASE codemastery_db;
```

Hibernate will auto-create all tables on startup (`ddl-auto=update`).

## Configuration

Database credentials are in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/codemastery_db
spring.datasource.username=root
spring.datasource.password=root
```

Update the username/password to match your MySQL installation.

## Running

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080/api**.

## API Endpoints

| Method | Endpoint                         | Description                          |
|--------|----------------------------------|--------------------------------------|
| GET    | `/api/courses`                   | Fetch all courses                    |
| GET    | `/api/courses?category=Java`     | Filter courses by category           |
| GET    | `/api/courses/{id}`              | Fetch a course by ID                 |
| POST   | `/api/courses`                   | Create a new course                  |
| GET    | `/api/enrollments`               | Fetch all enrollments                |
| GET    | `/api/enrollments?studentName=X` | Filter enrollments by student        |
| POST   | `/api/enrollments`               | Enroll a student in a course         |

### Example: Create a Course

```bash
curl -X POST http://localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete Java Masterclass",
    "description": "Master Java from beginner to pro",
    "instructor": "Marcus Chen",
    "price": 89.99,
    "category": "Java",
    "rating": 4.8
  }'
```

### Example: Enroll a Student

```bash
curl -X POST http://localhost:8080/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": 1,
    "studentName": "Jane Doe"
  }'
```

## Connecting the Frontend

The React frontend's service layer (`src/services/api.js`) is pre-configured
to call `http://localhost:8080/api`. Set `USE_MOCK_DATA = false` in that file
to switch from mock data to the live backend.
