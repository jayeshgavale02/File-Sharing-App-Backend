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
   
2.Create a .env file in the root directory with the following contents:
  ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/file-sharing-app
   JWT_SECRET=your_secret_key

4.Start the server:
   ```bash
    node server.js

