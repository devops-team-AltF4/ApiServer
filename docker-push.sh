docker build -t api-server:latest .
docker login
docker image tag auth-server:latest vnfmsqkek3/api-server:latest
docker push vnfmsqkek3/api-server:latest