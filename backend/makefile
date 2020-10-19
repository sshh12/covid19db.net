image_name = covid19db/backend
container_name = "covid19db-api-server"
flask_server_port = 5000
path = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

clean: docker-clean

branches:
	git branch -vv -a

run-server:
	python main.py

docker-build:
	docker build -t $(image_name) .

docker-run:
	docker run -d -v $(path):/app/backend			\
	-p $(flask_server_port):$(flask_server_port)	\
	--rm --name=$(container_name) $(image_name)		\
	python /app/backend/main.py

docker-stop:
	docker container stop $(container_name)

docker-clean:
	docker container prune -f
	docker image prune -f

docker-containers:
	docker container ls -a

format:
	black -l 120 main.py src/*.py

install-python-deps:
	pip install -r requirements.txt
