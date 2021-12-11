echo "shutdown start"
docker-compose down;
echo "shutdown finish"
echo "run server start"
docker-compose -f docker-compose-deploy.yml up --build -d
echo "run server finish"