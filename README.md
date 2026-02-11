# Notely

A modern, full-stack note-taking application built with React and Node.js. Notely provides a clean, intuitive interface for creating, editing, and managing your notes with real-time autosave functionality.

## ✨ Features

- 🔐 **Secure Authentication** - User registration and login with JWT-based authentication
- 📝 **Rich Text Editor** - Create and edit notes with a WYSIWYG editor
- 💾 **Auto-save** - Your changes are automatically saved as you type
- 🗑️ **Trash System** - Soft delete notes with the ability to restore them
- 👤 **User Profiles** - Manage your account settings
- 🔒 **Password Recovery** - Security question-based password recovery system
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Built with Tailwind CSS for a clean, professional look

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Simple WYSIWYG** - Rich text editor

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vkp0007/Notely.git
   cd Notely
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=notely
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the development servers**
   
   **Backend:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000` (or your configured port).

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /profile` - Get user profile (Protected)
- `PUT /profile` - Update user profile (Protected)
- `GET /password/question` - Get user's security question
- `POST /password/reset` - Reset password with security question

### Pages (`/api/pages`) - All routes are protected
- `GET /` - Get all user's pages
- `GET /?deleted=true` - Get deleted pages
- `POST /` - Create a new page
- `GET /:id` - Get a specific page
- `PUT /:id` - Update a page (autosave)
- `DELETE /:id` - Delete a page

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes on both frontend and backend
- Security questions for password recovery
- CORS configuration for secure cross-origin requests

## 🚢 Deployment

This application is configured for deployment on **Vercel**.

**Live Demo:** [notelyapplication.vercel.app](https://notelyapplication.vercel.app)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by popular note-taking applications
- Designed for simplicity and efficiency
