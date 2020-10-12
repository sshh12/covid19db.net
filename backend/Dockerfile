FROM python:3

RUN apt-get update
RUN apt-get -y install libboost-all-dev libgmp-dev vim

RUN pip install --upgrade pip
RUN pip --version

WORKDIR /app/build

COPY requirements.txt ./

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "/app/backend/main.py"]