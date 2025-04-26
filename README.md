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

```
---

### Docker and Docker Compose

### 1.1 Dockerfile Implementation
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV DB_HOST=db \
    DB_USER=student \
    DB_PASSWORD=Neema@@24 \
    DB_NAME=student_db \
    PORT=3000
CMD ["node", "server.js"]

## 1.2 Build and Run Verification
```bash
# Build the image
docker build -t student-api .

# Run the container
docker run -d -p 3000:3000 --name api-container student-api

# Test endpoints (expect DB connection errors at this stage)
curl http://localhost:3000/students 
curl http://localhost:3000/subjects
```
## 2. Docker Compose Setup
### 2.1 Multi-container Configuration
docker-compose.yml:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports: ["3000:3000"]
    depends_on: [db]
    environment:
      - DB_HOST=db
      - DB_USER=student
      - DB_PASSWORD=Neema@@24
      - DB_NAME=student_db

  db:
    image: mysql:8.0
    environment:
      MYSQL_USER: student
      MYSQL_PASSWORD: Neema@@24
      MYSQL_DATABASE: student_db
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - mysql_data:/var/lib/mysql
      - ./db-scripts:/docker-entrypoint-initdb.d

volumes:
  mysql_data:
```
---

## 2.2 Database Initialization
db-scripts/init.sql:

```sql
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    program VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50)
);
```
---

-- Sample data
INSERT INTO students (name, program) VALUES 
('John Doe', 'Computer Science'),


INSERT INTO subjects (name, code) VALUES
('Mathematics', 'MATH101'),

## 2.3 Full Stack Deployment
```bash
# Start all services
docker-compose up -d --build

# Verify running containers
docker ps

# Test API functionality
```bash
curl http://localhost:3000/students
curl http://localhost:3000/students
```
---

## 3. AWS Deployment

### 3.1 EC2 Preparation
```bash
# Install Docker on EC2
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker ubuntu
newgrp docker

###3.2 Production Deployment
On EC2:

```bash
cd /home/ubuntu/api
docker-compose up -d
3.4 Security Configuration
AWS Console → EC2 → Security Groups

Add inbound rule: TCP port 3000 (0.0.0.0/0)
```
---
## 4. Docker Registry Upload
### 4.1 Push to Docker Hub
```bash
docker login
docker tag student-api yourusername/student-api:v1
docker push yourusername/student-api:v1
```
---
## 4.2 Submission Requirement
Include in README.md:

markdown
## Docker Image
Available at: `https://hub.docker.com/r/yourusername/student-api

