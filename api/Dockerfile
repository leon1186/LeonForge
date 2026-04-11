
FROM python:3.12-slim-bookworm

WORKDIR /src

RUN apt-get update && apt-get install -y postgresql-client

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "leon_forge_design.wsgi:application"]




