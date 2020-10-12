clean:
	rm -rf util/__pycache__

branches:
	git branch -vv -a

docker-build:
	docker build -t covid19db/backend .

docker-run:
	docker run -d -v $(pwd):/app/backend -p 5000:5000 covid19db/backend
