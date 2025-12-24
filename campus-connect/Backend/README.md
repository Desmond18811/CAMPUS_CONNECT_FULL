# CampCon Backend

A robust Express.js backend for a student resource sharing platform where students can upload, share, and rate educational resources with Google OAuth authentication.

## Features

- **User Authentication**: Sign up and login with Google OAuth or traditional email/password
- **Resource Management**: Upload, view, update, and delete educational resources
- **Rating System**: Rate resources and view ratings from other students
- **RESTful API**: Clean API endpoints for all operations
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Session Management**: Secure user sessions with express-session

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with Google OAuth strategy
- **Session Management**: express-session
- **Environment Variables**: dotenv

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/campcon-backend.git
cd campcon-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campcon
SESSION_SECRET=your-super-secret-session-key-here
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
CLIENT_URL=http://localhost:3000
```

4. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env` file accordingly

5. Set up Google OAuth:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized redirect URIs (e.g., `http://localhost:5000/api/auth/google/callback`)
   - Copy the Client ID and Client Secret to your `.env` file

6. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in your .env file).

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Resource Routes
- `GET /api/resources` - Get all resources (with optional filtering)
- `GET /api/resources/:id` - Get a specific resource
- `POST /api/resources` - Create a new resource (authenticated)
- `PUT /api/resources/:id` - Update a resource (authenticated, owner only)
- `DELETE /api/resources/:id` - Delete a resource (authenticated, owner or admin)
- `POST /api/resources/:id/rate` - Rate a resource (authenticated)
- `GET /api/resources/:id/ratings` - Get ratings for a resource

## Data Models

### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  googleId: String,
  role: String (enum: ['student', 'teacher', 'admin']),
  school: String,
  createdAt: Date
}
```

### Resource
```javascript
{
  title: String,
  description: String,
  fileUrl: String,
  uploader: ObjectId (ref: User),
  subject: String,
  gradeLevel: String,
  resourceType: String (enum: ['notes', 'assignment', 'textbook', 'video', 'other']),
  averageRating: Number,
  ratingsCount: Number,
  createdAt: Date
}
```

### Rating
```javascript
{
  user: ObjectId (ref: User),
  resource: ObjectId (ref: Resource),
  rating: Number (min: 1, max: 5),
  comment: String,
  createdAt: Date
}
```

## Project Structure

```
campcon-backend/
├── config/
│   ├── database.js
│   └── passport.js
├── controllers/
│   ├── authController.js
│   ├── resourceController.js
│   └── userController.js
├── models/
│   ├── Resource.js
│   ├── User.js
│   └── Rating.js
├── routes/
│   ├── auth.js
│   ├── resources.js
│   └── users.js
├── middleware/
│   └── auth.js
├── app.js
├── package.json
└── .env
```

## Usage Examples

### User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "school": "Example University"
  }'
```

### User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Resource (Authenticated)
```bash
curl -X POST http://localhost:5000/api/resources \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "title": "Calculus Notes",
    "description": "Comprehensive notes on differential calculus",
    "fileUrl": "https://example.com/calculus-notes.pdf",
    "subject": "Mathematics",
    "gradeLevel": "University",
    "resourceType": "notes"
  }'
```

### Rate a Resource
```bash
curl -X POST http://localhost:5000/api/resources/123456/rate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "rating": 5,
    "comment": "Very helpful notes!"
  }'
```

## Frontend Integration

This backend is designed to work with a React frontend. Check out the [CampCon Frontend](https://github.com/your-username/campcon-frontend) repository for a compatible React application.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Built with ❤️ for the educational community
