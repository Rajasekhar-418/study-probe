# CodeMastery - Online Course-Selling Platform

A modern, fully responsive course-selling platform focused on Java, Spring Boot, and full-stack development education.

## Tech Stack

- **Frontend:** React 18, Tailwind CSS, Lucide React, Vite
- **Backend:** Java 17, Spring Boot 3.2.5, Spring Data JPA, MySQL 8.0+

---

## Project Structure

```text
project/
├── src/                        # React frontend source files
│   ├── components/             # Reusable UI components
│   ├── context/                # App-wide state management
│   ├── data/                   # Mock data source
│   ├── pages/                  # Page-level views
│   └── services/               # API service layer
├── backend/                    # Java Spring Boot backend
│   ├── src/main/java/          # Controllers, models, services, repositories
│   ├── src/main/resources/     # Application properties
│   └── pom.xml                 # Maven configuration
└── README.md                   # Project documentation
