docker compose up -d --build 
sleep 10
docker exec leonforge_api python manage.py migrate  
docker exec leonforge_api python manage.py shell -c "exec(open('./setup_data.py').read())"




docker compose exec db psql -U postgres -d wines
docker compose exec api python manage.py makemigrations 
docker compose exec api python manage.py migrate
docker compose exec api python manage.py shell 
docker compose exec api python manage.py createsuperuser



drf-wine-api-main

docker exec drf-wine-api-main-api-1 python manage.py shell -c "exec(open('./setup_data.py').read())"    

from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

user = User.objects.get(username="admin")
token, created = Token.objects.get_or_create(user=user)

print(token.key)

