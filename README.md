# Assignment 6 - Sequelize Models & RESTful APIs

## 📋 Project Overview

This project implements **Sequelize ORM models** with validations and **RESTful APIs** for a blogging system with Users, Posts, and Comments. The assignment demonstrates the use of Sequelize's `define()` and `Model.init()` methods, model associations, validations, hooks, and various Sequelize query methods.

---

## 📁 Project Structure

```
Assignment6/
├── src/
│   ├── main.js                    # Application entry point
│   ├── app.bootstrap.js           # Express server setup & route configuration
│   ├── DB/
│   │   ├── Connection.js          # Sequelize database connection configuration
│   │   ├── User/
│   │   │   └── user.model.js      # User model (using sequelize.define)
│   │   ├── Post/
│   │   │   └── post.model.js      # Post model (using Model.init)
│   │   └── Comment/
│   │       └── comment.model.js   # Comment model (using Model.init)
│   ├── Modules/
│   │   ├── User/
│   │   │   ├── user.controller.js # User API routes
│   │   │   └── user.service.js    # User business logic
│   │   ├── Post/
│   │   │   ├── post.controller.js # Post API routes
│   │   │   └── post.service.js    # Post business logic
│   │   └── Comment/
│   │       ├── comment.controller.js # Comment API routes
│   │       └── comment.service.js    # Comment business logic
│   └── util/
│       └── ResponseError.js       # Custom error class for API responses
├── bonus.js                       # Bonus LeetCode solution
├── queries.sql                    # SQL queries for database setup
├── ERD.drawio                     # Entity Relationship Diagram
├── TODO.md                        # Assignment checklist
└── package.json                   # Project dependencies

```

---

## 🗺️ File Map & Assignment Questions

### **Part 1: Sequelize Models**

#### **Users Model** (`src/DB/User/user.model.js`)
- **Question**: Create `Users` model using `sequelize.define`

#### **Posts Model** (`src/DB/Post/post.model.js`)
- **Question**: Create `Posts` model using `Model.init`

#### **Comments Model** (`src/DB/Comment/comment.model.js`)
- **Question**: Create `Comments` model using `Model.init`

#### **Database Connection** (`src/DB/Connection.js`)
- **Question**: Setup Sequelize connection to MySQL database

---

### **Part 2: RESTful APIs**

#### **User APIs** (`src/Modules/User/`)
- `POST /users/signup` → `signup()`
- `PUT /users/:id` → `updateOrCreate()`
- `GET /users/by-email` → `getByEmail()`
- `GET /users/:id` → `getById()`

#### **Post APIs** (`src/Modules/Post/`)
- `POST /posts` → `createPost()`
- `DELETE /posts/:postId` → `deletePost()`
- `GET /posts/details` → `getDetails()`
- `GET /posts/comment-count` → `getCommentCount()`

#### **Comment APIs** (`src/Modules/Comment/`)
- `POST /comments` → `createBulkComments()`
- `PATCH /comments/:commentId` → `updateComment()`
- `POST /comments/find-or-create` → `findOrCreateComment()`
- `GET /comments/search` → `searchComment()`
- `GET /comments/newest/:postId` → `getThreeComment()`
- `GET /comments/details/:id` → `getCommentById()`

---

### **Application Setup**

#### **Main Entry Point** (`src/main.js`)
- **Functionality**: Calls `bootstrap()` function to start the application

#### **Bootstrap Configuration** (`src/app.bootstrap.js`)
- **Functionality**:
  - Database connection testing and synchronization
  - Bulk data generation functions (commented out): `generateBulkUsers()`, `generateBulkPosts()`, `generateBulkComments()` - uncomment on first run to populate database with test data
  - Express server initialization
  - Middleware configuration (JSON parser, error handling)
  - Route mounting (`/users`, `/posts`, `/comments`)
  - Global error handler for Sequelize and custom errors
  - 404 handler for undefined routes

#### **Custom Error Handler** (`src/util/ResponseError.js`)
- **Functionality**: Extends Error class with `statusCode` and `info` properties for structured error responses

---

### **Additional Files**

#### **Bonus Solution** (`bonus.js`)
- **Question**: Bonus - Solve "Remove Element" problem on LeetCode
- **Functionality**: LeetCode solution implementation

#### **Database Queries** (`queries.sql`)
- **Functionality**: Database creation and test queries

#### **Entity Relationship Diagram** (`ERD.drawio`)
- **Functionality**: ERD diagram showing relationships between Users, Posts, and Comments

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL database server
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure database connection in `src/DB/Connection.js`:
```javascript
const DBConfig = {
    database: "Assignment6",
    username: "root",
    password: "your_password",
    host: "localhost",
    dialect: "mysql"
};
```

3. Create database using `queries.sql`:
```sql
CREATE DATABASE Assignment6;
```

4. (Optional) To populate database with test data, uncomment the bulk data generation functions in `src/app.bootstrap.js`:
   - `generateBulkUsers()`
   - `generateBulkPosts()`
   - `generateBulkComments()`
   
   **Note**: Uncomment only on the first run, then comment them again to avoid duplicate data.

5. Run the application:
```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

---

## 📚 API Endpoints Summary

### User Endpoints
- `POST /users/signup` - Create new user
- `PUT /users/:id` - Create or update user
- `GET /users/by-email?email=...` - Get user by email
- `GET /users/:id` - Get user by ID

### Post Endpoints
- `POST /posts` - Create new post
- `DELETE /posts/:postId` - Delete post (owner only)
- `GET /posts/details` - Get all posts with details
- `GET /posts/comment-count` - Get posts with comment counts

### Comment Endpoints
- `POST /comments` - Create bulk comments
- `PATCH /comments/:commentId` - Update comment (owner only)
- `POST /comments/find-or-create` - Find or create comment
- `GET /comments/search?word=...` - Search comments
- `GET /comments/newest/:postId` - Get 3 newest comments for post
- `GET /comments/details/:id` - Get comment details with relations

---

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL2** - MySQL database driver

---

## 📝 Notes

- The project uses ES6 modules (`import/export`)
- Models use both `sequelize.define()` and `Model.init()` methods as per assignment requirements
- Soft delete is enabled for Posts model (`paranoid: true`)
- Custom validations and hooks are implemented in the User model
- All associations are properly configured with foreign key constraints
- Error handling is centralized using custom `ResponseError` class

---

## 👤 Author

Omar-MK-20
