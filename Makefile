up:
	docker-compose up -d

down:
	docker-compose down
	
restart:
	docker-compose restart

init:
	cp .env.example .env
	docker-compose up --build -d

build:
	docker-compose up --build -d

logs:
	docker-compose logs -f