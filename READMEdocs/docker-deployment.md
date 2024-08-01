## Containerize and deploy in docker.

Change the name skuill to your own profile name in docker hub. Before publishing, change the version to the current one in package.json and in the commands below.

1. Build image and push to DockerHub:

   ```bash
cd C:\Projects\portfolio

docker image build -t skuill/portfolio:2.0.0 .
docker image build -t skuill/portfolio:latest .

docker push skuill/portfolio:2.0.0
docker push skuill/portfolio:latest
   ```

2. Pull image, create and run container:
   ```bash
docker pull skuill/portfolio:latest

docker run -dit --restart=always -p 3000:3000 --name skuill-portfolio skuill/portfolio:latest
   ```

3. Inspect image:
   ```bash
docker exec -it skuill-portfolio /bin/sh
   ```

