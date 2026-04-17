docker compose up -d --build 
sleep 10
docker exec leonforge_api python manage.py makemigrations
docker exec leonforge_api python manage.py migrate

docker exec leonforge_api python manage.py shell -c "exec(open('./setup_data.py').read())"

#admin user: leonforge
#password: admin