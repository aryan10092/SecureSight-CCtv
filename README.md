# SecureSight CCTV Monitoring Dashboard

A comprehensive CCTV monitoring software dashboard built with Next.js 15, featuring real-time incident management and camera feed monitoring.

## 🚀 Features

- **Real-time Incident Monitoring**: Track and manage security incidents across multiple camera feeds
- **Interactive Dashboard**: Clean, professional interface optimized for 24/7 monitoring
- **Incident Management**: Mark incidents as resolved with optimistic UI updates
- **Multi-Camera Support**: Monitor up to 3 CCTV feeds simultaneously
- **Threat Detection**: Support for various incident types including:
  - Unauthorised Access
  - Gun Threats
  - Face Recognition
  - Suspicious Activity
  - Theft Alerts
  - Fire Detection

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript

## 📦 Installation & Setup

1. **Clone and navigate to the project**:
   ```bash
   cd securesight
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🗄 Database Schema

### Camera Model
- `id`: Unique identifier
- `name`: Camera name (e.g., "Shop Floor A")
- `location`: Camera location description

### Incident Model
- `id`: Unique identifier
- `cameraId`: Reference to Camera
- `type`: Incident type (Unauthorised Access, Gun Threat, etc.)
- `tsStart`: Incident start timestamp
- `tsEnd`: Incident end timestamp
- `thumbnailUrl`: Path to incident thumbnail
- `resolved`: Boolean flag for resolution status

## 🔌 API Endpoints

- `GET /api/incidents?resolved=false` - Retrieve unresolved incidents
- `PATCH /api/incidents/:id/resolve` - Toggle incident resolution status

## 📁 Project Structure

```
securesight/
├── src/
│   ├── app/
│   │   ├── api/incidents/          # API routes
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Main page
│   ├── components/
│   │   ├── Dashboard.tsx           # Main dashboard component
│   │   ├── Navbar.tsx              # Navigation header
│   │   ├── IncidentPlayer.tsx      # Video player area
│   │   └── IncidentList.tsx        # Incident management panel
│   └── lib/
│       ├── prisma.ts               # Database client
│       ├── types.ts                # TypeScript definitions
│       └── utils.ts                # Utility functions
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── seed.ts                     # Sample data seeder
└── public/thumbnails/              # Incident thumbnails
```

## 🎯 Key Components

### Dashboard Layout
- **Navbar**: Displays system status and current date
- **Incident Player**: Main video feed area with camera controls
- **Incident List**: Right sidebar with active incidents and resolution controls

### Features Implemented
- ✅ Responsive dark theme UI
- ✅ Real-time incident fetching
- ✅ Optimistic UI updates
- ✅ Multi-camera thumbnail strip
- ✅ Incident type icons and color coding
- ✅ Time formatting and duration calculations
- ✅ Database seeding with realistic data

## 🚧 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:seed       # Seed with sample data

# Linting
npm run lint
```

## 📋 Assessment Requirements Fulfilled

### Mandatory Deliverables ✅
- **Data Models**: Camera and Incident models with proper relationships
- **Seed Script**: Comprehensive seeding with 3+ cameras and 12+ incidents
- **Database**: SQLite implementation with Prisma ORM
- **API Routes**: 
  - GET `/api/incidents?resolved=false` (newest first)
  - PATCH `/api/incidents/:id/resolve` (toggle resolution)
- **Frontend Components**:
  - Navbar with system branding
  - Incident Player with video placeholder and camera strip
  - Incident List with thumbnails, icons, and resolve functionality
  - Optimistic UI updates

### Optional Features 🎁
- Professional dark theme design
- Responsive layout
- Loading states and error handling
- TypeScript for type safety
- Proper code organization and documentation

## 🌟 Future Enhancements

- Real video stream integration
- Live incident timeline
- 3D visualization components
- Real-time WebSocket updates
- Advanced filtering and search
- User authentication and roles
- Export and reporting features

## 🤝 Contributing

This project was built as a technical assessment for SecureSight. For any questions or suggestions, please reach out to the development team.

---

**Built with ❤️ using Next.js 15 and modern web technologies**
