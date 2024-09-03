## Containerize and deploy in docker.

#### Prerequisites
1. Change the name skuill to your own profile name in docker hub.
2. Before publishing, change the version to the current one in package.json and in the commands below.

#### Commands

1. Build image and push to DockerHub:

   ```bash
      cd C:\Projects\portfolio

      docker image build -t skuill/portfolio:5.0.0 .
      docker image build -t skuill/portfolio:latest .

      docker push skuill/portfolio:5.0.0
      docker push skuill/portfolio:latest
   ```

2. Pull image, create and run container:
   ```bash
      docker pull skuill/portfolio:latest

      docker run -dit --restart=always -p 3000:80 --name skuill-portfolio skuill/portfolio:latest
   ```

3. Inspect image:
   ```bash
      docker exec -it skuill-portfolio /bin/sh
   ```

