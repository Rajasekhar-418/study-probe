================================================================================
                    CodeMastery — Online Course-Selling Platform
================================================================================

A modern, fully-responsive course-selling platform (Udemy-style) focused on
Java, Spring Boot, and full-stack development education.

Built with React, Tailwind CSS, and Lucide React on the frontend, and
Java Spring Boot with MySQL on the backend.


--------------------------------------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------------------------------------

project/
├── src/                        # React frontend
│   ├── components/             # Reusable UI components (Navbar, Footer, etc.)
│   ├── context/                # App-wide state management (cart, navigation)
│   ├── data/                   # Mock data (courses, instructors, categories)
│   ├── pages/                  # Page-level views (Home, Detail, Dashboard, etc.)
│   ├── services/               # API service layer (connects to Spring Boot)
│   ├── App.tsx                 # Root component with page routing
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles + Tailwind directives
│
├── backend/                    # Java Spring Boot backend
│   ├── src/main/java/com/codemastery/courses/
│   │   ├── model/              # JPA entities (Course, Enrollment)
│   │   ├── repository/         # Spring Data JPA repositories
│   │   ├── service/            # Business logic layer
│   │   ├── controller/         # REST controllers with CORS
│   │   ├── dto/                # Request/response data transfer objects
│   │   └── CoursePlatformApplication.java
│   ├── src/main/resources/
│   │   └── application.properties   # MySQL + Hibernate config
│   └── pom.xml                 # Maven dependencies
│
├── index.html                  # HTML entry point
├── package.json                # Frontend dependencies (React, Tailwind, etc.)
├── tailwind.config.js          # Tailwind theme (colors, fonts, animations)
├── vite.config.ts              # Vite build config with path aliases
└── README.txt                  # This file


--------------------------------------------------------------------------------
FRONTEND — FEATURES & PAGES
--------------------------------------------------------------------------------

1. NAVBAR
   - Search bar for finding courses
   - Categories dropdown (Java, Spring Boot, Frontend, Backend, etc.)
   - Cart icon with item count badge
   - Dashboard and Instructor Studio links
   - Fully responsive with mobile hamburger menu

2. HOMEPAGE
   - Hero banner: "Master Java, Spring Boot & Full-Stack Development"
   - Code window mockup with live Spring Boot code snippet
   - Category filter pills (horizontally scrollable)
   - Responsive grid of course cards showing:
     * Course thumbnail image
     * Title and subtitle
     * Instructor name
     * Star rating and review count
     * Price (with original strikethrough price)
     * Level and lecture count
   - Sorting options (Most Popular, Highest Rated, Price Low/High)
   - Search filtering across title, subtitle, and description

3. COURSE DETAIL PAGE
   - Full course overview with level badge and bestseller tag
   - "What you'll learn" highlights checklist
   - Expandable syllabus accordion (sections with lessons)
     * Shows lock icons for unenrolled students
     * Shows play icons for enrolled students
   - Instructor bio with avatar, title, rating, and student count
   - Sticky purchase sidebar:
     * Course preview thumbnail
     * Price with discount percentage
     * Add to Cart / Buy Now buttons
     * Wishlist and Share buttons
     * Course includes list (duration, lectures, certificate, lifetime access)
   - Related courses grid at the bottom

4. STUDENT DASHBOARD
   - Stats cards: enrolled count, completed, in progress, average progress
   - List of enrolled courses with:
     * Thumbnail and title
     * Instructor name and rating
     * Animated progress bar with lesson count
     * Last accessed timestamp
     * "Continue Learning" or "Review Course" button

5. INSTRUCTOR STUDIO
   - Full form to publish a new course:
     * Basic info (title, subtitle, category, level, description)
     * Pricing (with auto-calculated original price for discount display)
     * Thumbnail image picker
     * Learning outcomes (4 fields)
     * Dynamic syllabus builder (add/remove sections and lessons)
   - Form validation with inline error messages
   - Success confirmation screen after publishing

6. CART PAGE
   - List of cart items with thumbnails, titles, and prices
   - Remove item buttons
   - Order summary with subtotal, savings, tax, and total
   - Checkout button that enrolls student in all cart courses
   - Empty cart state with "Browse Courses" call to action


--------------------------------------------------------------------------------
FRONTEND — TECH DETAILS
--------------------------------------------------------------------------------

- Framework: React 18 with JSX (JavaScript, not TypeScript in components)
- Styling: Tailwind CSS 3 with custom color system
  * Primary: Indigo ramp (50-950)
  * Accent: Amber ramp (50-900)
  * Success, Warning, Error ramps
  * Custom animations: fade-in, slide-up, slide-down, scale-in, shimmer
- Icons: Lucide React
- Fonts: Inter (body) + Plus Jakarta Sans (headings) via Google Fonts
- State: React Context API (AppContext.jsx) for cart, navigation, enrollments
- Routing: Custom page state routing (no react-router needed)
- Data: Mock data in src/data/mockData.js
  * 8 categories
  * 5 instructors with bios and avatars
  * 12 courses with full syllabi, ratings, and pricing
  * 4 pre-loaded enrollments with progress tracking

Service Layer (src/services/api.js):
  - All data access goes through the api object
  - USE_MOCK_DATA flag (currently true) controls data source
  - Set to false to call the real Spring Boot backend at
    http://localhost:8080/api
  - Zero changes needed in components when switching


--------------------------------------------------------------------------------
BACKEND — SPRING BOOT REST API
--------------------------------------------------------------------------------

Tech Stack:
  - Spring Boot 3.2.5 (Java 17)
  - Spring Data JPA + Hibernate
  - MySQL 8.0+
  - Lombok (getters/setters/constructors)
  - Bean Validation (request validation)

Entities:
  - Course: id, title, description, instructor, price, category, rating, created_at
  - Enrollment: id, courseId, studentName, enrollmentDate

REST Endpoints (all under /api, CORS enabled for localhost:5173):

  GET    /api/courses                   Fetch all courses
  GET    /api/courses?category=Java     Filter courses by category
  GET    /api/courses/{id}              Fetch course by ID
  POST   /api/courses                   Create a new course
  GET    /api/enrollments               Fetch all enrollments
  GET    /api/enrollments?studentName=X Filter enrollments by student
  POST   /api/enrollments               Enroll a student in a course

All responses are wrapped in ApiResponse JSON structure:
  {
    "success": true,
    "message": "Courses retrieved successfully",
    "data": { ... },
    "timestamp": "2026-10-10T..."
  }


--------------------------------------------------------------------------------
HOW TO RUN THE FRONTEND
--------------------------------------------------------------------------------

Prerequisites:
  - Node.js 18+
  - npm

Steps:
  1. npm install         (install dependencies)
  2. npm run dev         (start dev server at http://localhost:5173)

The app runs entirely on mock data by default. No backend needed to preview.


--------------------------------------------------------------------------------
HOW TO RUN THE BACKEND
--------------------------------------------------------------------------------

Prerequisites:
  - Java 17+
  - Maven 3.8+
  - MySQL 8.0+ running on localhost:3306

Steps:
  1. Create the database:
       mysql -u root -p
       CREATE DATABASE codemastery_db;

  2. Update credentials in backend/src/main/resources/application.properties
     if your MySQL username/password differs from root/root.

  3. Start the backend:
       cd backend
       mvn spring-boot:run

  4. The API starts at http://localhost:8080/api
     Hibernate auto-creates all tables on first run.

  5. To connect the frontend to the live backend, edit:
       src/services/api.js
     Change: USE_MOCK_DATA = true
     To:     USE_MOCK_DATA = false


--------------------------------------------------------------------------------
CONNECTING FRONTEND TO BACKEND
--------------------------------------------------------------------------------

The frontend service layer (src/services/api.js) is designed as a drop-in
replacement. Every function has two code paths:

  if (USE_MOCK_DATA) -> returns mock data with a simulated delay
  else               -> makes a real HTTP fetch to http://localhost:8080/api

No component changes are needed when switching from mock to real data.
Simply flip the USE_MOCK_DATA flag in src/services/api.js.


--------------------------------------------------------------------------------
COLOR SYSTEM
--------------------------------------------------------------------------------

Primary (Indigo):   50-950 ramp, used for buttons, links, accents
Accent (Amber):     50-900 ramp, used for bestseller badges, highlights
Success (Green):    50-900 ramp, used for completed courses, confirmations
Warning (Orange):   50-900 ramp, used for alerts
Error (Red):        50-900 ramp, used for errors, delete actions
Neutral:            Gray scale, used for backgrounds, text, borders

Spacing: 8px base unit (Tailwind default)
Typography: Inter for body text, Plus Jakarta Sans for headings
Line height: 150% for body, 120% for headings
Font weights: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)


--------------------------------------------------------------------------------
COMPONENT INVENTORY
--------------------------------------------------------------------------------

Components (src/components/):
  - Navbar.jsx          Top navigation with search, categories, cart
  - Footer.jsx          Site footer with links and social icons
  - Hero.jsx            Homepage hero banner with code window
  - CourseCard.jsx      Reusable course card for grids
  - CategoryPills.jsx   Horizontal scrollable category filter
  - Rating.jsx          Star rating display with half-star support
  - SyllabusAccordion.jsx  Expandable course curriculum sections
  - Toast.jsx           Auto-dismissing notification toasts

Pages (src/pages/):
  - HomePage.jsx              Course catalog with filters and sorting
  - CourseDetailPage.jsx      Single course view with syllabus and purchase
  - DashboardPage.jsx         Student progress tracking
  - InstructorStudioPage.jsx  Course creation form
  - CartPage.jsx              Shopping cart and checkout

Context (src/context/):
  - AppContext.jsx      Global state: cart, navigation, enrollments, toasts

Services (src/services/):
  - api.js              API layer with mock/real data toggle


--------------------------------------------------------------------------------
FILES MODIFIED FROM TEMPLATE
--------------------------------------------------------------------------------

The following files were customized from the Vite starter template:
  - index.html          (title, meta description)
  - tailwind.config.js  (custom colors, fonts, animations)
  - vite.config.ts      (path alias, dependency optimization)
  - src/index.css       (fonts, base styles, utility classes)
  - src/App.tsx         (full app with routing)
  - src/main.tsx        (unchanged from template)

All other src/ files and the entire backend/ directory are new.


--------------------------------------------------------------------------------
VERSION HISTORY
--------------------------------------------------------------------------------

v1.0.0 — 2026-10-10
  - Initial release
  - Frontend: 5 pages, 8 reusable components, mock data for 12 courses
  - Backend: Spring Boot REST API with Course and Enrollment entities
  - Full responsive design from mobile to desktop
  - Mock data toggle for seamless backend integration

================================================================================
  CodeMastery — Master Java, Spring Boot & Full-Stack Development
================================================================================
