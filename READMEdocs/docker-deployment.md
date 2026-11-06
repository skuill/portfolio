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

2. Pull the image and restart the container on the droplet (what the Deploy workflow does; the compose file comes from the server configuration repository):
   ```bash
      cd /srv/docker/portfolio
      docker compose pull
      docker compose up -d --force-recreate
   ```

3. Inspect image:
   ```bash
      docker exec -it skuill-portfolio /bin/sh
   ```

