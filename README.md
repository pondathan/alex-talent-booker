# Alex Talent Booker

A talent booking data enrichment tool that processes Spotify artist links to build comprehensive artist profiles with metrics and event history, enabling data export for external email sequencing tools.

## 🚀 Features

- **Spotify Integration**: Paste Spotify artist URLs to fetch artist profiles
- **Artist Management**: Store and manage artist information in PostgreSQL
- **Data Export**: Export artist data to CSV/JSONL formats
- **Modern UI**: Clean, responsive React frontend with Tailwind CSS
- **RESTful API**: FastAPI backend with automatic documentation

## 🏗️ Architecture

- **Backend**: FastAPI + SQLModel (Python)
- **Database**: Supabase (PostgreSQL)
- **Frontend**: React + Vite + Tailwind CSS
- **Authentication**: Supabase Auth
- **Deployment**: Docker + GitHub Actions

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- Docker & Docker Compose
- Supabase account

## 🛠️ Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pondathan/alex-talent-booker.git
cd alex-talent-booker
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

### 3. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

### 5. Run the Application

#### Option A: Docker Compose (Recommended)

```bash
docker-compose up --build
```

#### Option B: Manual

**Backend:**
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📖 Usage

1. **Add Artist**: Paste a Spotify artist URL on the home page
2. **Preview**: Review the artist profile information
3. **Save**: Store the artist in the database
4. **View**: Browse all saved artists
5. **Export**: Download artist data as CSV

## 🗄️ Database Schema

The application uses the following main tables:
- `artists`: Core artist information
- `agents`: Agent/manager details
- `events`: Performance history
- `metrics_snapshots`: Social media metrics
- `audit_log`: User action tracking

## 🔧 Development

### Project Structure

```
alex-talent-booker/
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── docs/            # Documentation
├── scripts/         # Utility scripts
└── docker-compose.yml
```

### Adding New Features

1. **Backend**: Add models in `backend/app/models/`, services in `backend/app/services/`
2. **Frontend**: Create components in `frontend/src/components/`
3. **API**: Define routes in `backend/app/api/`

### Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Production

1. Set environment variables
2. Build Docker images
3. Deploy to your preferred platform (Render, Railway, etc.)

### GitHub Actions

The project includes basic CI/CD setup for:
- Code linting
- Testing
- Docker builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions or issues:
1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/pondathan/alex-talent-booker/issues)
3. Create a new issue with details

---

Built with ❤️ for the music industry
