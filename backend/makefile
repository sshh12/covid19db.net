image_name = covid19db/backend
container_name = "covid19db-api-server"
flask_server_port = 5000

clean: docker-clean
	rm -rf util/__pycache__

branches:
	git branch -vv -a

docker-build:
	docker build -t $(container_name) .

docker-run:
	docker run -d -v $(shell pwd):/app/backend 	 		\
	-p $(flask_server_port):$(flask_server_port) 		\
	--rm --name=$(container_name) $(image_name)
	docker exec -d $(container_name) python /app/backend/main.py

docker-stop:
	docker container stop $(container_name)

docker-clean:
	docker container prune -f
	docker image prune -f

docker-containers:
	docker container ls -a
