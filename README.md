# D'Creativs Studio Website

Official website for D'Creativs Studio — creative tech agency for web development, design, 3D, motion, and marketing.

**Tagline:** Built to be noticed

---

## Tech Stack

- **Frontend:** React
- **Backend:** Django (Django REST Framework)
- **Database:** SQLite (development) → PostgreSQL (production)

---

## Project Structure

```
dcreativs-website/
├── frontend/           # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/            # Django project
│   ├── manage.py
│   ├── <app_name>/
│   └── requirements.txt
├── README.md
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js (v18+) and npm
- Python 3.14+
- pip and virtualenv

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs the React app locally, typically at `http://localhost:3000`.

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs the Django API locally, typically at `http://localhost:8000`.

---

## Environment Variables

Create a `.env` file inside `/backend` (never commit this file). At minimum:

```
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

Update `DATABASE_URL` when moving to PostgreSQL for production.

---

## Branching & Workflow

- `main` — production-ready code only
- **Never commit or push directly to `main`.** All changes must be made on a separate branch.
- Create a feature branch per task: `feature/short-description`
- Open a pull request before merging into `main`
- Pricing, scope, or client-facing copy changes should be confirmed with Xant before merging

---

## Contributing

1. Pull the latest `main` before starting new work
2. Keep frontend and backend changes in separate commits where possible
3. Write clear commit messages (what changed, not just "update")
4. Test locally before opening a pull request

---

## Team

Built and maintained by the D'Creativs Studio team.

## License

Private and proprietary. All rights reserved.
