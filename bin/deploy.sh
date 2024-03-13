sh undeploy.sh
cd ..
yarn build
docker build -t vuitton-plus-web .
docker run -di --name vuitton-plus-web -p 8001:80 --restart=always vuitton-plus-web
docker ps | grep vuitton-plus-web
