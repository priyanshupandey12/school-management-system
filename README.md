# School Management System API

A simple RESTful API for managing student records, built using Node.js, Express, and with  MongoDB .
This system allows you to create, read, update, delete (CRUD) student data with proper validation and soft deletion.

Features

Create Student – Add new students with proper validations
Get All Students – Retrieve paginated student records
Get Student by Registration Number – Fetch details using regNo
Update Student – Modify existing student details
Delete Student (Soft Delete) – Deactivate a student instead of permanent deletion
Validations – Ensures proper data formatting using Joi

Tech Stack

Backend: Node.js, Express.js
Database: MongoDB
ORM: Mongoose
Validation: Joi
Environment Variables: dotenv
Middleware: Express JSON

Getting Started

API Usage Examples

1) Create a Student
Request:
POST /api/v1/students/create
{
  "regNo": "S101",
  "name": "Aryan Sharma",
  "class": "10A",
  "rollNo": 1,
  "contact": "9876543210"
}

Response:
{
  "message": "Student created successfully",
  "student": { ... }
}

2) Get All Students (Paginated)

Request:
GET /api/v1/students?page=1&limit=5

Response:
{
  "students": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalStudents": 15,
    "hasNextPage": true
  }
}

3) Fetch Student by Registration Number

Request:
GET /api/v1/students/S101

Response:
{
  
  "student": { ... }
}

4) Update a Student

   
Request:
PUT /api/v1/students/S101

{
  "name": "Aryan Raj Sharma",
  "contact": "9876543211"
}

Response:
{
  "message": "Student updated successfully",
  "student": { ... }
}


5)  Delete a Student

   Request:
   DELETE /api/v1/students/S101

   Response
   {
  "message": "Student deactivated successfully"
  }

  Project Structure
  
school-management-system/
│-- server.js
│-- .env
│-- package.json
│-- config/
│   └── database.js
│-- models/
│   └── student.model.js
│-- routes/
│   └── student.router.js
│-- controllers/
│   └── student.controller.js
│-- utils/
│   └── studentValidation.js
│   └── regNoValidation.js
│-- README.md


















