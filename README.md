

# Social Posting System

A full-stack web application that allows users to post content, like posts, and interact with others in a social media-like environment. The app is built using the MERN (MongoDB, Express.js, React, Node.js) stack with an additional focus on user authentication and post management.

## Features

- **User Authentication**: Users can register, log in, and manage their accounts.
- **Post Creation**: Users can create new posts with text content.
- **Like Posts**: Users can like posts, with each post being liked once.
- **View Posts**: Users can view all posts created by others.

## Tech Stack

- **Frontend**:
  - React.js
  - Material-UI (MUI)
  - Axios for API requests
  - Day.js for date formatting
- **Backend**:
  - Node.js with Express.js
  - MySQL for database management
  - JWT (JSON Web Tokens) for authentication
- **Other**:
  - GitHub Actions for CI/CD (if applicable)
  - Postman for API testing

## Installation

### Prerequisites

- Node.js (v16.x or higher)
- MySQL (or any compatible database)
- Git
- Postman (optional, for API testing)

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hashem03x/Social_Posting_System.git
   cd Social_Posting_System
   ```

2. **Set up the backend**:

   - Go to the `server` directory:
   
     ```bash
     cd server
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Configure the MySQL database and update the database credentials in `server/config/db.js` (or wherever the DB configuration is defined).
   
   - Run the server:

     ```bash
     npm start
     ```

   The backend should now be running on `http://localhost:5000` (or any configured port).

3. **Set up the frontend**:

   - Go to the `client` directory:
   
     ```bash
     cd ../client
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Run the React development server:

     ```bash
     npm start
     ```

   The frontend should now be accessible at `http://localhost:3000`.

4. **Optional**: Use Postman to test the API endpoints (GET, POST, PUT, DELETE requests) to ensure the backend is working as expected.

## API Endpoints

### Authentication
- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Log in an existing user.
  
### Posts
- **GET /api/posts** - Get all posts.
- **POST /api/posts/create** - Create a new post.
- **POST /api/posts/{id}/like** - Like a post.

## Contributing

We welcome contributions to improve the Social Posting System!

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.
