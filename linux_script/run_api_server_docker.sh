docker run -v /static:/code/app/static --gpus all --name api0 -p 5000:8000 api &
docker run -v /static:/code/app/static --gpus all --name api1 -p 5001:8000 api &
docker run -v /static:/code/app/static --name api2 -p 5002:8000 api &
docker run -v /static:/code/app/static --name api3 -p 5003:8000 api &
docker run -v /static:/code/app/static --name api4 -p 5004:8000 api &
docker run -v /static:/code/app/static --name api5 -p 5005:8000 api &
docker run -v /static:/code/app/static --name api6 -p 5006:8000 api &
docker run -v /static:/code/app/static --gpus all --name api7 -p 5007:8000 api &
docker run -v /static:/code/app/static --gpus all --name api8 -p 5008:8000 api &
docker run -v /static:/code/app/static --gpus all --name api9 -p 5009:8000 api 
