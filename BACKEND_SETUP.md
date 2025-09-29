# LinkHub Pro - Complete Backend Setup Guide

This guide will help you set up the complete backend infrastructure for LinkHub Pro with Node.js, Express.js, and MySQL.

## 🚀 Quick Start

### 1. Prerequisites

Before starting, ensure you have:
- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **Git**

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your configuration
# See Environment Configuration section below
```

### 3. Database Setup

#### Option A: Using MySQL Command Line
```bash
# Login to MySQL
mysql -u root -p

# Run the setup script
source database-setup.sql
```

#### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open `database-setup.sql`
4. Execute the script

### 4. Start Development Server

```bash
# Start the backend server
npm run dev
```

The server will start on `http://localhost:5000`

## 🔧 Environment Configuration

Create a `.env` file in the backend directory with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=linkhub_pro
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Security
BCRYPT_ROUNDS=12
```

### Important Notes:
- Replace `your_mysql_password` with your actual MySQL password
- Generate a strong JWT secret (at least 32 characters)
- Update `FRONTEND_URL` if your frontend runs on a different port

## 📊 Database Schema

The backend creates three main tables:

### Users Table
Stores user account information:
- `id` - Unique user identifier
- `email` - User's email address (unique)
- `username` - Username for profile URL (unique)
- `display_name` - User's display name
- `avatar` - Profile picture URL
- `password_hash` - Hashed password
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Profiles Table
Stores user profile information:
- `id` - Unique profile identifier
- `user_id` - Foreign key to users table
- `username` - Profile username (unique)
- `name` - Profile display name
- `bio` - Profile description
- `avatar` - Profile picture URL
- `theme_primary_color` - Primary theme color
- `theme_background_color` - Background color
- `theme_text_color` - Text color
- `created_at` - Profile creation timestamp
- `updated_at` - Last update timestamp

### Links Table
Stores user's links:
- `id` - Unique link identifier
- `profile_id` - Foreign key to profiles table
- `title` - Link title
- `url` - Link URL
- `icon` - Link icon (emoji)
- `order_index` - Display order
- `created_at` - Link creation timestamp
- `updated_at` - Last update timestamp

## 🔐 Authentication Flow

### Registration
1. User provides email, password, username, display name
2. Password is hashed using bcrypt
3. User account is created in database
4. Default profile is automatically created
5. JWT token is generated and returned

### Login
1. User provides email and password
2. Password is verified against stored hash
3. JWT token is generated and returned

### Protected Routes
- Include JWT token in Authorization header: `Bearer <token>`
- Token is verified on each request
- User information is attached to request object

## 📡 API Endpoints

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me (protected)
```

### Profile Endpoints
```
GET /api/profiles/:username (public)
GET /api/profiles/me/profile (protected)
PUT /api/profiles/me/profile (protected)
```

### Link Endpoints
```
POST   /api/links (protected)
PUT    /api/links/:linkId (protected)
DELETE /api/links/:linkId (protected)
POST   /api/links/reorder (protected)
```

### Health Check
```
GET /api/health
```

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with configurable rounds
- **JWT Authentication**: Secure token-based auth
- **CORS Protection**: Configurable cross-origin requests
- **Security Headers**: Helmet middleware
- **Input Validation**: Request data validation
- **SQL Injection Protection**: Parameterized queries

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong JWT secret
- Configure production database
- Set proper CORS origins

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **JWT Token Errors**
   - Verify JWT_SECRET is set
   - Check token format in Authorization header
   - Ensure token hasn't expired

3. **CORS Errors**
   - Update FRONTEND_URL in `.env`
   - Check frontend is running on correct port

4. **Port Already in Use**
   - Change PORT in `.env`
   - Kill process using the port

### Logs
- Development logs are shown in console
- Production logs should be configured with a logging service
- Database errors are logged with stack traces

## 📝 API Testing

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser",
    "displayName": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Profile (with token):**
```bash
curl -X GET http://localhost:5000/api/profiles/testuser \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman
1. Import the API endpoints
2. Set up environment variables
3. Test authentication flow
4. Test protected endpoints

## 🔄 Frontend Integration

The backend is designed to work with the React frontend. Update your frontend to:

1. **Replace Firebase with API calls**
2. **Store JWT tokens in localStorage**
3. **Include Authorization headers**
4. **Handle authentication state**

### Example Frontend API Integration:
```javascript
// API base URL
const API_BASE = 'http://localhost:5000/api';

// Login function
const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};
```

## 📚 Next Steps

1. **Set up the backend** following this guide
2. **Test the API endpoints** using cURL or Postman
3. **Update the frontend** to use the new API
4. **Configure production deployment**
5. **Set up monitoring and logging**

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify all environment variables
3. Check database connectivity
4. Review server logs
5. Test API endpoints individually

The backend is now ready to power your LinkHub Pro application! 🎉
