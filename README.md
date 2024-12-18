# 📁 **File Sharing App - Backend**

## 📝 **Overview**
The **File Sharing App Backend** is built with **Node.js** and **Express.js** to provide a secure and scalable REST API for managing file operations and user authentication. It integrates a **MongoDB** database for efficient storage and retrieval of data.

---

## ✨ **Features**
- **File Management**:  
   - Upload, rename, delete, and secure files.
- **Authentication**:  
   - Secure access to APIs using **JWT (JSON Web Tokens)**.
- **Password Protection**:  
   - Protect files with passwords for restricted access.
- **Error Handling**:  
   - Robust error handling ensures smooth and reliable API interaction.
- **Scalable Architecture**:  
   - Built for scalability and performance to handle multiple users.

---

## 🛠️ **Technologies Used**
- **Node.js**: Runtime environment for server-side JavaScript.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: Database for storing user and file metadata.
- **Multer**: Middleware for handling file uploads.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

---

## ⚙️ **Setup Instructions**

### **Prerequisites**
- **Node.js**: Version 14 or later.
- **MongoDB**: Installed locally or hosted (e.g., MongoDB Atlas).
- **Postman** (or any API testing tool) for testing the API.

---

### **Installation Steps**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/file-sharing-app-backend.git
   cd file-sharing-app-backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory with the following contents:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/file-sharing-app
JWT_SECRET=your_secret_key
Start the server:

bash
Copy code
npm start
Access the API:

bash
Copy code
http://localhost:5000/api
🌩️ API Endpoints
Authentication
Endpoint	Method	Description
/api/auth/register	POST	Register a new user
/api/auth/login	POST	Login and get a JWT token
File Management
Endpoint	Method	Description
/api/files/upload	POST	Upload a file
/api/files/:id	GET	Get file details
/api/files/:id	DELETE	Delete a file
/api/files/:id/rename	PUT	Rename a file
/api/files/:id/protect	PUT	Add password protection
📂 Folder Structure
scss
Copy code
/src
  /controllers         // Controller logic for API endpoints
  /middlewares         // Authentication and error handling middleware
  /models              // Mongoose schemas for User and File
  /routes              // API routes for authentication and file operations
  /uploads             // Directory for uploaded files
  index.js             // Entry point of the application
🌐 API Example
Here’s an example of how to upload a file using Postman:

Set the URL to:

bash
Copy code
POST http://localhost:5000/api/files/upload
Add the following headers:

makefile
Copy code
Authorization: Bearer <your-jwt-token>
In the Body tab, select form-data:

Key: file (type: File)
Value: (Choose a file from your system)
Click Send to upload the file.
