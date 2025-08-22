# Alex Talent Booker - Project Plan

## Project Overview
A talent booking data enrichment tool that processes Spotify artist links to build comprehensive artist profiles with metrics and event history, enabling data export for external email sequencing tools.

## Phase 1 MVP Scope
**Goal**: User can paste a Spotify artist URL, see a preview, validate it, and save the artist profile in PostgreSQL.

## Technical Architecture

### Backend (FastAPI + SQLModel)
- **Framework**: FastAPI with SQLModel for ORM
- **Database**: Supabase (PostgreSQL with built-in auth, real-time, and API)
- **Authentication**: Supabase Auth with JWT tokens
- **API Structure**: RESTful endpoints with OpenAPI documentation

### Frontend (React)
- **Framework**: React with Vite for fast development
- **UI Library**: Tailwind CSS for styling
- **State Management**: React Context or Zustand
- **Form Handling**: React Hook Form with validation
- **Database Client**: Supabase JavaScript client for direct DB access

### Database Schema
```
artists
├── id (UUID, PK)
├── spotify_id (VARCHAR, UNIQUE)
├── name (VARCHAR)
├── spotify_url (VARCHAR)
├── image_url (VARCHAR)
├── genres (JSONB)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

agents
├── id (UUID, PK)
├── name (VARCHAR)
├── email (VARCHAR)
├── phone (VARCHAR)
├── agency (VARCHAR)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

artist_agent_links
├── id (UUID, PK)
├── artist_id (UUID, FK)
├── agent_id (UUID, FK)
├── relationship_type (VARCHAR)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

events
├── id (UUID, PK)
├── artist_id (UUID, FK)
├── venue_name (VARCHAR)
├── city (VARCHAR)
├── state (VARCHAR)
├── event_date (DATE)
├── event_type (VARCHAR)
├── ticket_sales (INTEGER)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

metrics_snapshots
├── id (UUID, PK)
├── artist_id (UUID, FK)
├── spotify_monthly_listeners (INTEGER)
├── instagram_followers (INTEGER)
├── twitter_followers (INTEGER)
├── youtube_subscribers (INTEGER)
├── snapshot_date (DATE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

provider_status
├── id (UUID, PK)
├── provider_name (VARCHAR)
├── status (VARCHAR)
├── last_check (TIMESTAMP)
├── error_message (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

audit_log
├── id (UUID, PK)
├── user_id (UUID, FK)
├── action (VARCHAR)
├── resource_type (VARCHAR)
├── resource_id (UUID)
├── changes (JSONB)
├── ip_address (INET)
├── user_agent (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Implementation Plan

### Day 1: Project Scaffolding & Setup
1. **Initialize Project Structure**
   - Create project directory structure
   - Set up Python virtual environment
   - Initialize Git repository
   - Create requirements.txt and dependencies

2. **Backend Foundation**
   - Set up FastAPI application structure
   - Configure SQLModel and database connection
   - Create basic project configuration
   - Set up environment variables

3. **Database Setup**
   - Set up Supabase project and database
   - Implement database models with SQLModel
   - Create database tables via Supabase dashboard or migrations
   - Set up Row Level Security (RLS) policies

4. **Basic API Structure**
   - Set up FastAPI app with middleware
   - Create basic health check endpoint
   - Implement CORS configuration
   - Set up logging and error handling

### Day 2: Core Backend Features
1. **Spotify Integration**
   - Implement Spotify URL parser
   - Create Spotify API client (stub initially)
   - Build artist profile extraction logic
   - Implement preview API endpoint

2. **Artist Management**
   - Create CRUD operations for artists
   - Implement artist validation logic
   - Add duplicate detection
   - Create artist preview response model

3. **Authentication System**
   - Integrate Supabase Auth
   - Set up user roles and permissions
   - Configure RLS policies for data access
   - Add authentication middleware

### Day 3: Frontend Development
1. **React Application Setup**
   - Initialize Vite + React project
   - Set up Tailwind CSS
   - Create basic component structure
   - Implement routing

2. **Core Components**
   - Create URL input form
   - Build artist preview card
   - Implement validation feedback
   - Add save/confirm functionality

3. **API Integration**
   - Set up API client
   - Implement form submission
   - Add error handling
   - Create loading states

### Day 4: Integration & Testing
1. **Backend-Frontend Integration**
   - Connect frontend to backend APIs
   - Test complete user flow
   - Implement error handling
   - Add input validation

2. **Audit Logging**
   - Implement audit log system
   - Log all user actions
   - Add IP tracking and user agent logging
   - Create audit log viewing endpoint

3. **Testing & Validation**
   - Write basic unit tests
   - Test API endpoints
   - Validate database operations
   - Test authentication flow

### Day 5: Polish & Deployment
1. **Export Functionality**
   - Implement CSV export
   - Add JSONL export
   - Create export endpoint
   - Add export to frontend

2. **Error Handling & UX**
   - Improve error messages
   - Add loading indicators
   - Implement retry logic
   - Add success notifications

3. **Deployment Setup**
   - Configure GitHub Actions
   - Set up basic CI/CD pipeline
   - Prepare deployment scripts
   - Document deployment process

## File Structure
```
alex-talent-booker/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── api/
│   │   ├── services/
│   │   ├── auth/
│   │   └── utils/
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── docs/
├── scripts/
├── .github/
│   └── workflows/
├── docker-compose.yml
├── README.md
└── PROJECT_PLAN.md
```

## Dependencies

### Backend
- FastAPI
- SQLModel
- Supabase Python client
- Pydantic
- Python-multipart
- Uvicorn

### Frontend
- React
- Vite
- Tailwind CSS
- React Hook Form
- Supabase JavaScript client
- React Router (if needed)

## Success Metrics
- [ ] User can paste Spotify artist URL
- [ ] System displays artist preview
- [ ] User can validate and save artist profile
- [ ] Artist data is stored in PostgreSQL
- [ ] Basic authentication works
- [ ] Audit logging is functional
- [ ] Export functionality works
- [ ] Frontend is responsive and user-friendly

## Next Phase Considerations
- Real Spotify API integration
- Metrics API integration (Instagram, Twitter, YouTube)
- Events API integration
- Advanced search and filtering
- Bulk import functionality
- Advanced analytics dashboard
- User management and permissions
- API rate limiting and caching

## Notes
- Start with stubbed APIs for metrics and events
- Focus on clean, modular code architecture
- Implement proper error handling from the start
- Use environment variables for configuration
- Set up proper logging and monitoring
- Document API endpoints with OpenAPI
- **Supabase Benefits**: Built-in auth, real-time subscriptions, automatic API generation, dashboard for data management
- **Considerations**: RLS policies for security, environment variables for Supabase URL/keys, potential for direct frontend DB access
