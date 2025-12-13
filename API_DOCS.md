# API Documentation

Complete API reference for Wardeh Portfolio Backend.

## Base URL
```
Development: http://localhost:5000
Production: https://api.yourdomain.com
```

## Table of Contents
- [Authentication](#authentication)
- [Sections](#sections)
- [SubSections](#subsections)
- [FAQs](#faqs)
- [Periods](#periods)
- [Projects](#projects)
- [Error Handling](#error-handling)

---

## Authentication

### Register User
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Access:** Public

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Validation:**
- `username`: 3-30 characters
- `email`: Valid email format
- `password`: Minimum 6 characters

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid-here",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Login
Authenticate user and receive JWT token.

**Endpoint:** `POST /api/auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminpass"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid-here",
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Note:** Token is also set as HTTP-only cookie named `token`.

---

### Logout
Clear authentication token.

**Endpoint:** `POST /api/auth/logout`

**Access:** Private

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Get All Users
Retrieve all registered users.

**Endpoint:** `GET /api/auth/users`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin",
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "uuid-2",
      "username": "user1",
      "email": "user1@example.com",
      "role": "user",
      "createdAt": "2025-01-16T12:30:00Z"
    }
  ]
}
```

---

### Delete User
Remove user from the system.

**Endpoint:** `DELETE /api/auth/users/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Parameters:**
- `id` (UUID): User ID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Sections

### Get All Sections
Retrieve all portfolio sections.

**Endpoint:** `GET /api/sections`

**Access:** Public

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "title": "About Me",
      "subtitle": "Get to know me",
      "description": "I'm a passionate developer...",
      "sectionType": "about",
      "order": 1,
      "isActive": true,
      "customData": {
        "skills": ["JavaScript", "React", "Node.js"]
      },
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

---

### Get Section By Type
Retrieve a section by its type including all subsections.

**Endpoint:** `GET /api/sections/type/:sectionType`

**Access:** Public

**Parameters:**
- `sectionType`: `hero`, `about`, `services`, or `tools`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Section found successfully",
  "data": {
    "id": "uuid-here",
    "title": "About Me",
    "subtitle": "Get to know me",
    "description": "I'm a passionate developer...",
    "sectionType": "about",
    "order": 1,
    "isActive": true,
    "subsections": [
      {
        "id": "subsection-uuid-1",
        "sectionId": "uuid-here",
        "title": "My Background",
        "description": "...",
        "icon": "https://example.com/icon.png",
        "backgroundColor": "#10B981",
        "buttonText": "Learn More",
        "buttonLink": "/about",
        "order": 1,
        "isActive": true
      },
      {
        "id": "subsection-uuid-2",
        "sectionId": "uuid-here",
        "title": "My Skills",
        "description": "...",
        "order": 2,
        "isActive": true
      }
    ]
  }
}
```

---

### Get Section By ID
Retrieve a specific section.

**Endpoint:** `GET /api/sections/:id`

**Access:** Public

**Parameters:**
- `id` (UUID): Section ID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "About Me",
    "subtitle": "Get to know me",
    "description": "I'm a passionate developer...",
    "sectionType": "about",
    "order": 1,
    "isActive": true,
    "customData": {},
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### Create Section
Create a new section.

**Endpoint:** `POST /api/sections`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Skills",
  "subtitle": "What I'm good at",
  "description": "My technical skills and expertise",
  "sectionType": "skills",
  "order": 3,
  "isActive": true,
  "customData": {
    "categories": ["Frontend", "Backend", "Design"]
  }
}
```

**Validation:**
- `title`: 2-100 characters (required)
- `subtitle`: 2-200 characters (optional)
- `description`: 10-1000 characters (optional)
- `sectionType`: `hero`, `about`, `experience`, `skills`, `contact` (required)
- `order`: Integer (optional, default: 0)
- `isActive`: Boolean (optional, default: true)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Section created successfully",
  "data": {
    "id": "uuid-here",
    "title": "Skills",
    "sectionType": "skills",
    "order": 3,
    "isActive": true
  }
}
```

---

### Update Section
Update an existing section.

**Endpoint:** `PUT /api/sections/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Parameters:**
- `id` (UUID): Section ID

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Skills",
  "isActive": false
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Section updated successfully",
  "data": {
    "id": "uuid-here",
    "title": "Updated Skills",
    "isActive": false
  }
}
```

---

### Delete Section
Delete a section.

**Endpoint:** `DELETE /api/sections/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Parameters:**
- `id` (UUID): Section ID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Section deleted successfully"
}
```

---

## SubSections

### Get All SubSections
Retrieve all subsections.

**Endpoint:** `GET /api/subsections`

**Access:** Public

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "sectionId": "section-uuid",
      "title": "Frontend Skills",
      "content": "React, Vue, Angular...",
      "mediaUrl": "https://example.com/image.jpg",
      "mediaType": "image",
      "order": 1,
      "isActive": true,
      "linkText": "View Projects",
      "linkUrl": "/projects",
      "customData": {},
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

---

### Get SubSection By ID
Retrieve a specific subsection.

**Endpoint:** `GET /api/subsections/:id`

**Access:** Public

**Parameters:**
- `id` (UUID): SubSection ID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "sectionId": "section-uuid",
    "title": "Frontend Skills",
    "content": "React, Vue, Angular...",
    "order": 1,
    "isActive": true
  }
}
```

---

### Get SubSections By Section
Retrieve all subsections for a specific section.

**Endpoint:** `GET /api/subsections/section/:sectionId`

**Access:** Public

**Parameters:**
- `sectionId` (UUID): Section ID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "sectionId": "section-uuid",
      "title": "Frontend Skills",
      "order": 1
    },
    {
      "id": "uuid-2",
      "sectionId": "section-uuid",
      "title": "Backend Skills",
      "order": 2
    }
  ]
}
```

---

### Create SubSection
Create a new subsection.

**Endpoint:** `POST /api/subsections`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "sectionId": "section-uuid",
  "title": "Backend Development",
  "content": "Node.js, Express, PostgreSQL...",
  "mediaUrl": "https://example.com/backend.jpg",
  "mediaType": "image",
  "order": 2,
  "isActive": true,
  "linkText": "Learn More",
  "linkUrl": "/about-backend"
}
```

**Validation:**
- `sectionId`: Valid UUID (required)
- `title`: 2-100 characters (required)
- `content`: 10-2000 characters (optional)
- `mediaUrl`: Valid URL (optional)
- `mediaType`: `image` or `video` (optional)
- `order`: Integer (optional)
- `isActive`: Boolean (optional)

**Response:** `201 Created`

---

### Update SubSection
Update an existing subsection.

**Endpoint:** `PUT /api/subsections/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Parameters:**
- `id` (UUID): SubSection ID

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Title",
  "isActive": false
}
```

**Response:** `200 OK`

---

### Delete SubSection
Delete a subsection.

**Endpoint:** `DELETE /api/subsections/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Parameters:**
- `id` (UUID): SubSection ID

**Response:** `200 OK`

---

## FAQs

### Get All FAQs
Retrieve all frequently asked questions.

**Endpoint:** `GET /api/faqs`

**Access:** Public

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "question": "What services do you offer?",
      "answer": "I offer UI/UX design, web development...",
      "order": 1,
      "isActive": true,
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

---

### Get Active FAQs
Retrieve only active FAQs.

**Endpoint:** `GET /api/faqs/active`

**Access:** Public

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Active FAQs found successfully",
  "data": [
    {
      "id": "uuid-here",
      "question": "What technologies do you use?",
      "answer": "React, Node.js, PostgreSQL...",
      "order": 1,
      "isActive": true
    }
  ]
}
```

---

### Get FAQ By ID
Retrieve a specific FAQ.

**Endpoint:** `GET /api/faqs/:id`

**Access:** Public

**Parameters:**
- `id` (UUID): FAQ ID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "question": "How do you approach projects?",
    "answer": "I follow a user-centered design process...",
    "order": 2,
    "isActive": true
  }
}
```

---

### Create FAQ
Create a new FAQ.

**Endpoint:** `POST /api/faqs`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "question": "How long does a project take?",
  "answer": "Typically 4-8 weeks depending on complexity...",
  "order": 5,
  "isActive": true
}
```

**Validation:**
- `question`: 5-500 characters (required)
- `answer`: 10-2000 characters (required)
- `order`: Integer (optional, default: 0)
- `isActive`: Boolean (optional, default: true)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "FAQ created successfully",
  "data": {
    "id": "uuid-here",
    "question": "How long does a project take?",
    "answer": "Typically 4-8 weeks...",
    "order": 5,
    "isActive": true
  }
}
```

---

### Update FAQ
Update an existing FAQ.

**Endpoint:** `PUT /api/faqs/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Parameters:**
- `id` (UUID): FAQ ID

**Request Body:** (All fields optional)
```json
{
  "question": "Updated question?",
  "isActive": false
}
```

**Response:** `200 OK`

---

### Delete FAQ
Delete an FAQ.

**Endpoint:** `DELETE /api/faqs/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Parameters:**
- `id` (UUID): FAQ ID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "FAQ deleted successfully"
}
```

---

## Periods

Periods represent work experiences or timeline entries associated with FAQs (e.g., company, position, dates).

### Get All Periods
Retrieve all periods.

**Endpoint:** `GET /api/periods`

**Access:** Public

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "faqId": "faq-uuid",
      "company": "Google",
      "position": "Senior UX Designer",
      "startDate": "2020-01",
      "endDate": "Present",
      "description": "Leading design initiatives for core products...",
      "order": 1
    }
  ]
}
```

---

### Get Periods By FAQ
Retrieve all periods for a specific FAQ.

**Endpoint:** `GET /api/periods/faq/:faqId`

**Access:** Public

**Parameters:**
- `faqId` (UUID): FAQ ID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Periods found successfully",
  "data": [
    {
      "id": "period-uuid-1",
      "faqId": "faq-uuid",
      "company": "Meta",
      "position": "UX Researcher",
      "startDate": "2018-06",
      "endDate": "2020-01",
      "description": "Conducted user research for AR/VR experiences",
      "order": 1
    },
    {
      "id": "period-uuid-2",
      "faqId": "faq-uuid",
      "company": "Google",
      "position": "Senior UX Designer",
      "startDate": "2020-01",
      "endDate": "Present",
      "description": "Leading design initiatives",
      "order": 2
    }
  ]
}
```

---

### Get Period By ID
Retrieve a specific period.

**Endpoint:** `GET /api/periods/:id`

**Access:** Public

**Parameters:**
- `id` (UUID): Period ID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "faqId": "faq-uuid",
    "company": "Google",
    "position": "Senior UX Designer",
    "startDate": "2020-01",
    "endDate": "Present",
    "description": "Leading design initiatives...",
    "order": 1
  }
}
```

---

### Create Period
Create a new period entry.

**Endpoint:** `POST /api/periods`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "faqId": "faq-uuid-here",
  "company": "Apple",
  "position": "Lead Product Designer",
  "startDate": "2022-03",
  "endDate": "Present",
  "description": "Designing next-generation user experiences for iOS",
  "order": 1
}
```

**Validation:**
- `faqId`: Valid UUID (required)
- `company`: 2-100 characters (required)
- `position`: 2-100 characters (optional)
- `startDate`: YYYY-MM format (required)
- `endDate`: YYYY-MM format or "Present" (required)
- `description`: Max 500 characters (optional)
- `order`: Integer (optional, default: 0)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Period created successfully",
  "data": {
    "id": "uuid-here",
    "faqId": "faq-uuid-here",
    "company": "Apple",
    "position": "Lead Product Designer",
    "startDate": "2022-03",
    "endDate": "Present",
    "order": 1
  }
}
```

---

### Update Period
Update an existing period.

**Endpoint:** `PUT /api/periods/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Parameters:**
- `id` (UUID): Period ID

**Request Body:** (All fields optional)
```json
{
  "endDate": "2024-12",
  "description": "Updated description"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Period updated successfully",
  "data": {
    "id": "uuid-here",
    "endDate": "2024-12",
    "description": "Updated description"
  }
}
```

---

### Delete Period
Delete a period entry.

**Endpoint:** `DELETE /api/periods/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Parameters:**
- `id` (UUID): Period ID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Period deleted successfully"
}
```

---

## Projects

### Get All Projects
Retrieve all portfolio projects.

**Endpoint:** `GET /api/projects`

**Access:** Public

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "title": "E-commerce Platform",
      "slug": "ecommerce-platform-redesign",
      "category": "web_development",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "shortDescription": "A modern e-commerce solution with advanced features",
      "projectType": "Full Stack Application",
      "myRole": "Lead Developer",
      "timeline": "6 months",
      "toolsUsed": ["React", "Node.js", "PostgreSQL", "Stripe"],
      "images": [
        "https://example.com/img1.jpg",
        "https://example.com/img2.jpg"
      ],
      "fullDescription": "Detailed project description...",
      "projectUrl": "https://project-demo.com",
      "githubUrl": "https://github.com/user/project",
      "order": 1,
      "isActive": true,
      "isFeatured": true,
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

---

### Get Active Projects
Retrieve only active (published) projects.

**Endpoint:** `GET /api/projects/active`

**Access:** Public

**Response:** `200 OK` (Same format as Get All Projects)

---

### Get Featured Projects
Retrieve featured projects for homepage.

**Endpoint:** `GET /api/projects/featured`

**Access:** Public

**Response:** `200 OK` (Same format as Get All Projects)

---

### Get Projects By Category
Filter projects by category.

**Endpoint:** `GET /api/projects/category/:category`

**Access:** Public

**Parameters:**
- `category`: `ui_design`, `ux_research`, or `web_development`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "title": "Mobile App UI",
      "category": "ui_design",
      "slug": "mobile-app-ui-design"
    },
    {
      "id": "uuid-2",
      "title": "Dashboard Redesign",
      "category": "ui_design",
      "slug": "dashboard-redesign"
    }
  ]
}
```

---

### Get Project By Slug
Retrieve project by SEO-friendly slug.

**Endpoint:** `GET /api/projects/slug/:slug`

**Access:** Public

**Parameters:**
- `slug` (string): URL-friendly identifier (e.g., "ecommerce-platform-redesign")

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "E-commerce Platform",
    "slug": "ecommerce-platform-redesign",
    "category": "web_development",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "shortDescription": "A modern e-commerce solution",
    "myRole": "Lead Developer",
    "timeline": "6 months",
    "toolsUsed": ["React", "Node.js"],
    "images": ["https://example.com/img1.jpg"],
    "fullDescription": "Complete project details...",
    "projectUrl": "https://demo.com",
    "isActive": true,
    "isFeatured": true
  }
}
```

---

### Get Project By ID
Retrieve project by UUID.

**Endpoint:** `GET /api/projects/:id`

**Access:** Public

**Parameters:**
- `id` (UUID): Project ID

**Response:** `200 OK` (Same format as Get Project By Slug)

---

### Create Project
Create a new portfolio project.

**Endpoint:** `POST /api/projects`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Portfolio Website",
  "slug": "portfolio-website-2025",
  "category": "web_development",
  "thumbnail": "https://example.com/portfolio-thumb.jpg",
  "shortDescription": "A modern portfolio showcasing my work and skills",
  "projectType": "Personal Website",
  "myRole": "Full Stack Developer & Designer",
  "timeline": "3 months",
  "toolsUsed": ["React", "Next.js", "Tailwind CSS", "PostgreSQL"],
  "images": [
    "https://example.com/portfolio-1.jpg",
    "https://example.com/portfolio-2.jpg",
    "https://example.com/portfolio-3.jpg"
  ],
  "fullDescription": "This project showcases my journey as a developer...",
  "projectUrl": "https://myportfolio.com",
  "githubUrl": "https://github.com/username/portfolio",
  "order": 1,
  "isActive": true,
  "isFeatured": true
}
```

**Validation:**
- `title`: 3-100 characters (required)
- `slug`: Lowercase, numbers, hyphens only (e.g., "my-project-2024") (required)
- `category`: `ui_design`, `ux_research`, `web_development` (required)
- `thumbnail`: Valid URL (required)
- `shortDescription`: 10-300 characters (required)
- `projectType`: 2-100 characters (optional)
- `myRole`: 2-100 characters (required)
- `timeline`: 2-50 characters (required)
- `toolsUsed`: Array of strings, minimum 1 (required)
- `images`: Array of valid URLs, minimum 1 (required)
- `fullDescription`: Minimum 50 characters (optional)
- `projectUrl`: Valid URL (optional)
- `githubUrl`: Valid URL (optional)
- `order`: Integer (optional)
- `isActive`: Boolean (optional, default: true)
- `isFeatured`: Boolean (optional, default: false)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": "uuid-here",
    "title": "Portfolio Website",
    "slug": "portfolio-website-2025",
    "category": "web_development"
  }
}
```

---

### Update Project
Update an existing project.

**Endpoint:** `PUT /api/projects/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Parameters:**
- `id` (UUID): Project ID

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Project Title",
  "isFeatured": true,
  "isActive": false
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "id": "uuid-here",
    "title": "Updated Project Title",
    "isFeatured": true,
    "isActive": false
  }
}
```

---

### Delete Project
Delete a project.

**Endpoint:** `DELETE /api/projects/:id`

**Access:** Private/Admin

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Parameters:**
- `id` (UUID): Project ID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Error Handling

All errors follow a consistent format:

### Validation Error
**Status:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    },
    {
      "field": "password",
      "message": "String must contain at least 6 character(s)"
    }
  ]
}
```

---

### Authentication Error
**Status:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

or

```json
{
  "success": false,
  "message": "No token provided"
}
```

---

### Authorization Error
**Status:** `403 Forbidden`
```json
{
  "success": false,
  "message": "Access denied. Admin role required."
}
```

---

### Not Found Error
**Status:** `404 Not Found`
```json
{
  "success": false,
  "message": "Section not found"
}
```

---

### Server Error
**Status:** `500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding it for production.

---

## CORS Policy

CORS is enabled for the frontend URL specified in `.env`:
```
FRONTEND_URL=http://localhost:3000
```

Credentials (cookies) are supported.

---

## Best Practices

1. **Always use HTTPS in production**
2. **Store JWT tokens securely** (HTTP-only cookies preferred)
3. **Validate all inputs** on both client and server
4. **Use slug for public URLs** instead of IDs for better SEO
5. **Set `isActive: false`** instead of deleting content
6. **Use `isFeatured`** to highlight 3-5 best projects
7. **Optimize images** before uploading (store URLs in database)
8. **Keep `order` field** consistent for proper content sorting

---

## Support

For issues or questions, contact: yousef.alshwawra@gmail.com

