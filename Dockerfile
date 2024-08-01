ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

# Copy the rest of the source files into the image.
COPY . .

RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3000

CMD ["npm", "start"]