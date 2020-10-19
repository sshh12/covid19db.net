image_name = covid19db/backend
container_name = "covid19db-api-server"
flask_server_port = 5000
docker_repo = cameron99d/covid19db-backend
path = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

clean: docker-clean

branches:
	git branch -vv -a

run-server:
	python main.py

docker-push:
	docker login
	docker tag $(image_name) $(docker_repo)
	docker push $(docker_repo)
	docker rmi $(docker_repo)
	docker logout

docker-pull:
	docker pull $(docker_repo)
	docker tag $(docker_repo) $(image_name)
	docker rmi $(docker_repo)

docker-build:
	docker build -t $(image_name) .

docker-run:
	docker run -d -v $(path):/app/backend 	 		\
	-p $(flask_server_port):$(flask_server_port) 		\
	--rm --name=$(container_name) $(image_name)			\
	python /app/backend/main.py

docker-stop:
	docker container stop $(container_name)

docker-clean:
	docker container prune -f
	docker image prune -f

docker-images:
	docker images

docker-containers:
	docker container ls -a
