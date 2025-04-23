## Containerize and deploy in docker.

#### Prerequisites
1. Change the name skuill to your own profile name in docker hub.
2. Before publishing, change the version to the current one in package.json and in the commands below.

#### Commands

1. Build image and push to DockerHub:

   ```bash
      cd C:\Projects\portfolio

      docker image build -t skuill/portfolio:<VERSION_FROM_PACKAGE> .
      docker image build -t skuill/portfolio:latest .

      docker push skuill/portfolio:<VERSION_FROM_PACKAGE>
      docker push skuill/portfolio:latest
   ```

2. Pull image, create and run container:
   ```bash
      docker pull skuill/portfolio:latest
      
      docker rm -f skuill-portfolio 
      docker run -dit --restart=always --network common-skuill-network -p 3000:80 --name skuill-portfolio skuill/portfolio:latest
   ```

3. Inspect image:
   ```bash
      docker exec -it skuill-portfolio /bin/sh
   ```

