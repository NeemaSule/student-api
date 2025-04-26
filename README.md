# Student API Deployment - CS 421 Assignment 1

## Project Description
A RESTful API built with Node.js, Express, and MySQL that provides student and curriculum information for the University of Dodoma. The API is deployed on AWS EC2 with Nginx as a reverse proxy.

## API Endpoints

### Student Information
- `GET /students`
  - Returns: List of all students with their programs
  - Example response:
    ```json
    [
      {
        "id": 1,
        "name": "Neema Suleman",
        "program": "Software Engineering"
      },
      {
        "id": 2,
        "name": "Merry Jane",
        "program": "Computer Science"
      }
    ]
    ```

### Curriculum Information
- `GET /subjects`
  - Returns: Subjects grouped by academic year
  - Example response:
    ```json
    {
      "Year 1": [
        "Introduction to Programming",
        "Discrete Mathematics"
      ],
      "Year 2": [
        "Data Structures and Algorithms",
        "Database Systems"
      ]
    }
    ```

## Deployment Details

**Public URLs:**
- API Base URL: `http://54.152.132.206`
- Students Endpoint: `http://54.152.132.206/students`
- Subjects Endpoint: `http://54.152.132.206/subjects`

**GitHub Repository:**  
https://github.com/NeemaSule/student-api.git

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MySQL (v8.0+)
- Nginx
- PM2 (for process management)

### 1. Database Setup
```sql
CREATE DATABASE student_db;
USE student_db;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    program VARCHAR(100) NOT NULL
);

CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year INT NOT NULL
);
