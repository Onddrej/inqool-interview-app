# InQool Interview App

This is a React + TypeScript web application built for the InQool Frontend Interview assignment.  
The app communicates with a provided REST API and allows you to manage two entities: **users** and **animals**.

## Features

### Users Page (`/users`)
- **List users** in a table with columns: ID, Name, Gender, Banned status
- **Sort users by any column** by clicking on the table headers.
- **Search/filter users by any column** using a search input (searches all fields).
- **Clear filter** with a dedicated button.
- **Add a new user** via a modal form (validated with Zod).
- **Edit user details** via a modal form.
- **Delete user** directly from the edit modal.
- **Ban/Unban users** with a single click.
- **Success alerts** for add, edit, ban, unban, and delete actions.

### Animals Page (`/animals`)
- **List animals** in a table with columns: ID, Name, Type, Age
- **Sort animals by any column** by clicking on the table headers.
- **Search/filter animals by any column** using a search input (searches all fields).
- **Clear filter** with a dedicated button.
- **Add a new animal** via a modal form (validated with Zod).
- **Edit animal details** via a modal form.
- **Delete animal** directly from the edit modal.
- **Success alerts** for add, edit, and delete actions.

### Technical Stack
- **React** 
- **TypeScript**
- **Vite** 
- **Mantine** (UI library)
- **Tanstack Query** (for data fetching and caching)
- **React Hook Form** (for form state management)
- **Zod** (for schema validation)

## API

The app communicates with the public REST API at:  
`https://inqool-interview-api.vercel.app/api`

Supported endpoints:
- `/users` (GET, POST, PATCH, DELETE)
- `/animals` (GET, POST, PATCH, DELETE)
- `/seed` (POST, for seeding demo data)

## How to Run Locally

> **Note:** Deployment was not required for this assignment.  
> The app is intended to be run locally using the development server.

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser** and navigate to the local address shown in the terminal (usually `http://localhost:5173`).

## Project Structure

```
src/
  api/         # API calls for users and animals
  components/  # Reusable and entity-specific React components
  pages/       # Page components for routing
  style/       # Color and style definitions
```

## Notes

- All forms are validated using Zod schemas.
- All data fetching and mutations are handled via Tanstack Query for optimal UX.
- The UI is built with Mantine for a modern and accessible look.
- Alerts are shown for all important user actions.
- No deployment or production build was required as per assignment instructions.
