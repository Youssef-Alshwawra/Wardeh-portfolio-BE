# Wardeh Portfolio Backend API

A robust and secure RESTful API built with Express.js for managing portfolio content including sections, subsections, FAQs, and projects with full authentication and authorization.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **CRUD Operations**: Complete Create, Read, Update, Delete for all resources
- **Validation**: Zod schema validation for all inputs
- **Security**: Helmet, CORS, bcrypt password hashing
- **Database**: PostgreSQL with Drizzle ORM
- **Clean Architecture**: Factory patterns and middleware-based design

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/Youssef-Alshwawra/Wardeh-portfolio-BE.git
cd Wardeh-portfolio-BE
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp example.env .env
```

Edit `.env` file with your configuration:
```env
DB_URL=postgresql://username:password@localhost:5432/database_name
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
```

4. **Run database migrations**
```bash
npm run db:generate
npm run db:push
```

5. **Create admin user**
```bash
npm run create-admin
```

6. **Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/users` - Get all users (Admin only)
- `DELETE /api/auth/users/:id` - Delete user (Admin only)

### Sections
- `GET /api/sections` - Get all sections
- `GET /api/sections/:id` - Get section by ID
- `POST /api/sections` - Create section (Admin only)
- `PUT /api/sections/:id` - Update section (Admin only)
- `DELETE /api/sections/:id` - Delete section (Admin only)

### SubSections
- `GET /api/subsections` - Get all subsections
- `GET /api/subsections/:id` - Get subsection by ID
- `GET /api/subsections/section/:sectionId` - Get subsections by section
- `POST /api/subsections` - Create subsection (Admin only)
- `PUT /api/subsections/:id` - Update subsection (Admin only)
- `DELETE /api/subsections/:id` - Delete subsection (Admin only)

### FAQs
- `GET /api/faqs` - Get all FAQs
- `GET /api/faqs/period/:period` - Get FAQs by period
- `GET /api/faqs/:id` - Get FAQ by ID
- `POST /api/faqs` - Create FAQ (Admin only)
- `PUT /api/faqs/:id` - Update FAQ (Admin only)
- `DELETE /api/faqs/:id` - Delete FAQ (Admin only)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/active` - Get active projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/category/:category` - Get projects by category
- `GET /api/projects/slug/:slug` - Get project by slug
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Health Check
- `GET /health` - Server health status

## 🔐 Authentication

Protected routes require JWT token in cookies or Authorization header:

```bash
# Login to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'

# Use token in subsequent requests
curl http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📖 Full API Documentation

For detailed API documentation including request/response examples, see [API_DOCS.md](./API_DOCS.md)

## 🗄️ Database Schema

### Tables
- **sections**: Portfolio sections (About, Experience, Skills, etc.)
- **sub_sections**: Nested content within sections
- **faqs**: Frequently asked questions with timeline periods
- **projects**: Portfolio projects with categories and metadata
- **users**: System users with role-based access

### Enums
- **sectionType**: `hero`, `about`, `experience`, `skills`, `contact`
- **role**: `admin`, `user`
- **projectCategory**: `ui_design`, `ux_research`, `web_development`

## 🧪 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run db:generate # Generate Drizzle migrations
npm run db:push    # Push migrations to database
npm run db:studio  # Open Drizzle Studio (GUI)
npm run create-admin # Create admin user
```

## 🏗️ Project Structure

```
src/
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── config/
│   └── db.js             # Database connection
├── controllers/
│   ├── auth.controller.js
│   ├── section.controller.js
│   ├── subsection.controller.js
│   ├── faq.controller.js
│   └── project.controller.js
├── db/
│   └── schema.js         # Drizzle schema
├── middleware/
│   ├── auth.js           # Authentication & authorization
│   ├── validation.js     # Zod validation
│   └── errorHandler.js   # Global error handler
├── routes/
│   ├── index.js
│   ├── auth.routes.js
│   ├── section.routes.js
│   ├── subsection.routes.js
│   ├── faq.routes.js
│   └── project.routes.js
├── utils/
│   ├── asyncHandler.js   # Async error wrapper
│   ├── curdFactory.js    # Generic CRUD operations
│   └── responseHandler.js # Standardized responses
└── validations/
    ├── auth.validation.js
    ├── section.validation.js
    ├── subsection.validation.js
    ├── faq.validation.js
    └── project.validation.js
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **bcrypt**: Password hashing
- **JWT**: Secure token-based authentication
- **Validation**: Input sanitization with Zod
- **Role-based Access**: Admin-only protected routes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Youssef Alshwawra**
- GitHub: [@Youssef-Alshwawra](https://github.com/Youssef-Alshwawra)

## 🐛 Issues

Found a bug? Please open an issue on [GitHub Issues](https://github.com/Youssef-Alshwawra/Wardeh-portfolio-BE/issues)

## 📧 Support

For support, email: youssefalshwawra@example.com
