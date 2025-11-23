# MUA Finance Manager

## Overview
A comprehensive finance management application built with React, Vite, and Supabase. This application helps users manage clients, track payments, schedule appointments, manage service packages, and handle leads.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: TailwindCSS with custom plugins
- **Database**: Supabase (PostgreSQL)
- **Data Visualization**: D3.js and Recharts
- **Forms**: React Hook Form
- **Animation**: Framer Motion

### Key Features
1. **Dashboard** - Overview of metrics, revenue, and upcoming schedules
2. **Client Management** - Add, view, and manage client information
3. **Calendar & Scheduling** - Day, week, and month views for appointments
4. **Financial Tracking** - Track income and expenses with reports
5. **Payment Tracking** - Monitor client payments and send reminders
6. **Service Packages** - Create and manage service offerings
7. **Leads Management** - Track and convert leads with WhatsApp templates
8. **Settings & Profile** - User configuration and preferences

### Project Structure
```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth)
├── lib/           # External service integrations (Supabase)
├── pages/         # Page components with sub-components
├── services/      # Service layer (authService)
├── styles/        # Global CSS and Tailwind config
└── utils/         # Utility functions
```

## Environment Variables

This project requires Supabase configuration to function properly:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

### Setting up Supabase
1. Create a Supabase project at https://supabase.com
2. Get your project URL and anon key from Project Settings > API
3. Add these as environment variables in the Replit Secrets tab
4. Restart the application for changes to take effect

Note: The application will show a blank page until Supabase credentials are configured.

## Development

### Running the App
The application runs on port 5000 in development mode using Vite.

Command: `npm start`

### Build for Production
Build command: `npm run build`
Output directory: `build/`

## Recent Changes
- **Nov 23, 2025**: Initial setup for Replit environment
  - Configured Vite to run on port 5000
  - Removed allowedHosts restriction for Replit proxy compatibility
  - Set up workflow for development server
  - Configured static deployment (builds to `build/` directory)
  - Fixed duplicate key warning in PackageTemplates.jsx
  - Added Supabase setup instructions

## User Preferences
None documented yet.
