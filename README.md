# Leon Forge

Web application with:

- Backend: Django + DRF
- Database: PostgreSQL
- Frontend: React + Vite
- Local Orchestration: Docker Compose

## Requirements

- Docker Desktop (with `docker compose` enabled)
- Node.js 20+
- npm 10+
- (Optional) Git Bash/WSL to run `.sh` scripts

## 1) Set up environment variables

Create a `.env` file at the root of the project (same level as `docker-compose.yml`):

POSTGRES_DB=leonforge
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
SECRET_KEY=unsafe-local-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001

# Optional (if using S3)

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
AWS_S3_REGION_NAME=sa-east-1

## 2) Start backend + database (Docker)

### Option A: PowerShell (Windows)

docker compose up -d --build
Start-Sleep -Seconds 10
docker exec leonforge_api python manage.py migrate
docker exec leonforge_api python manage.py shell -c "exec(open('./setup_data.py').read())"

### Option B: Bash script

./up.sh

This starts:

- API at http://localhost:8000
- PostgreSQL at localhost:5432

## 3) Start frontend (React + Vite)

In another terminal:
cd frontend
npm install
npm run dev

Frontend available at http://localhost:5173.
The frontend connects to the backend at http://localhost:8000/api.

## Useful Endpoints

- GET http://localhost:8000/api/events/
- GET http://localhost:8000/api/events/s3-images/
- POST http://localhost:8000/api/inquiries/

## Shut down services

docker compose down

Or using script:
./down.sh

## Useful commands

docker compose logs -f api
docker compose ps
docker exec -it leonforge_api python manage.py createsuperuser
docker exec -it leonforge_api python manage.py shell
