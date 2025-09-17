# Overview

This is a full-stack TikTok video downloader web application built with React frontend and Express backend. The application allows users to input TikTok video URLs and download videos without watermarks. It features a modern, dark-themed UI with TikTok-inspired branding and provides multiple download quality options.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**React with TypeScript**: The client-side application is built using React with TypeScript for type safety and better development experience.

**UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives, providing a comprehensive set of accessible, customizable components with Tailwind CSS for styling.

**Routing**: Implements client-side routing using Wouter, a lightweight React router alternative.

**State Management**: 
- Uses TanStack Query (React Query) for server state management, caching, and API interactions
- Local component state with React hooks for UI state

**Styling**: 
- Tailwind CSS for utility-first styling
- Custom CSS variables for theming with dark mode support
- TikTok-inspired gradient color scheme

**Build System**: Vite for fast development and optimized production builds with Hot Module Replacement (HMR) support.

## Backend Architecture

**Express.js Server**: RESTful API server handling video processing requests and serving the React application in production.

**Storage Layer**: Currently implements in-memory storage with a clear interface that can be easily swapped for persistent storage solutions like PostgreSQL.

**Development Setup**: 
- Vite middleware integration for seamless development experience
- Request logging middleware for API monitoring
- Error handling middleware for graceful error responses

## Data Layer

**Database Schema**: Prepared for PostgreSQL with Drizzle ORM, including user management schema with username/password authentication.

**Migration System**: Drizzle Kit configured for database migrations and schema management.

**Type Safety**: Full type safety from database to frontend using shared TypeScript types.

## External Dependencies

**Third-party API Integration**: Integrates with external TikTok video processing API (batgpt.vercel.app) for video data extraction and download link generation.

**Database**: Configured for Neon Database (PostgreSQL) with connection pooling support.

**UI Components**: 
- Radix UI for accessible component primitives
- Lucide React for consistent iconography
- Embla Carousel for carousel functionality

**Development Tools**:
- ESBuild for server-side bundling
- PostCSS with Autoprefixer for CSS processing
- TypeScript for static type checking

**Deployment**: Optimized for Replit deployment with specific Vite plugins for runtime error handling and development banners.