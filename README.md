# Leon Forge

Aplicacion web con:

- Backend: Django + DRF
- Base de datos: PostgreSQL
- Frontend: React + Vite
- Orquestacion local: Docker Compose

## Requisitos

- Docker Desktop (con `docker compose` habilitado)
- Node.js 20+
- npm 10+
- (Opcional) Git Bash/WSL para usar scripts `.sh`

## 1) Configurar variables de entorno

Crear un archivo `.env` en la raiz del proyecto (mismo nivel que `docker-compose.yml`):

```env
POSTGRES_DB=leonforge
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432

SECRET_KEY=unsafe-local-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001

# Opcional (si usas S3)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
AWS_S3_REGION_NAME=sa-east-1
```

## 2) Levantar backend + base de datos (Docker)

### Opcion A: PowerShell (Windows)

```powershell
docker compose up -d --build
Start-Sleep -Seconds 10
docker exec leonforge_api python manage.py migrate
docker exec leonforge_api python manage.py shell -c "exec(open('./setup_data.py').read())"
```

### Opcion B: Script bash

```bash
./up.sh
```

Esto levanta:

- API en `http://localhost:8000`
- PostgreSQL en `localhost:5432`

## 3) Levantar frontend (React + Vite)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en `http://localhost:5173`.

El frontend consume el backend en `http://localhost:8000/api`.

## Endpoints utiles

- `GET http://localhost:8000/api/events/`
- `GET http://localhost:8000/api/events/s3-images/`
- `POST http://localhost:8000/api/inquiries/`

## Apagar servicios

```bash
docker compose down
```

O usando script:

```bash
./down.sh
```

## Comandos utiles

```bash
docker compose logs -f api
docker compose ps
docker exec -it leonforge_api python manage.py createsuperuser
docker exec -it leonforge_api python manage.py shell
```

## Troubleshooting rapido

- Si `./up.sh` falla en Windows, ejecuta los comandos de la seccion PowerShell.
- Si la API no conecta a Postgres, verifica que el `.env` exista en la raiz.
- Si el frontend no responde, confirma que corre en el puerto `5173` (`npm run dev`).
- Si tienes error de CORS, revisa `CORS_ALLOWED_ORIGINS` en `.env`.
