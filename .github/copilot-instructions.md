<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# SecureSight CCTV Monitoring Dashboard

This is a Next.js 15 project using the App Router for a CCTV monitoring dashboard called SecureSight.

## Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React
- **UI Components**: Custom components built with Tailwind CSS

## Project Structure
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components
- `src/lib/` - Utility functions, types, and Prisma client
- `prisma/` - Database schema and seed script

## Key Features
- Real-time incident monitoring dashboard
- Camera feed player (placeholder implementation)
- Incident list with filtering and resolution
- Responsive design optimized for desktop monitoring

## Database Models
- **Camera**: id, name, location
- **Incident**: id, cameraId, type, tsStart, tsEnd, thumbnailUrl, resolved

## API Endpoints
- `GET /api/incidents?resolved=false` - Get unresolved incidents
- `PATCH /api/incidents/:id/resolve` - Toggle incident resolution

## Development Notes
- Use TypeScript for all new code
- Follow React best practices with hooks and functional components
- Use Tailwind CSS for styling with consistent dark theme
- Implement optimistic UI updates for better user experience
- All API routes should handle errors gracefully
- Use Prisma for database operations
