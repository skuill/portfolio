ARG NODE_VERSION=20.15.0

# STAGE 1: install
FROM node:${NODE_VERSION}-alpine AS base
ENV NODE_ENV=production
WORKDIR /usr/src/base-stage
# Install dependencies
COPY package*.json ./
RUN echo "The NODE_ENV variable value is $NODE_ENV"
RUN npm ci --omit=dev && npm cache clean --force
# Copy the rest of the source files into the image.
COPY . .

# STAGE 2: build
FROM base AS build
ENV NODE_ENV=production
WORKDIR /usr/src/build-stage
COPY --from=base /usr/src/base-stage ./
RUN echo "The NODE_ENV variable value is $NODE_ENV"
RUN npm run build

# STAGE 3: app. Multistage production environment in nginx to reduce image space and increase speed
FROM nginx:stable-alpine
COPY --from=build /usr/src/build-stage/build /usr/share/nginx/html/portfolio
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  

# STAGE 3: app. Development environment in node.
#FROM node:${NODE_VERSION}-alpine AS app
#ENV NODE_ENV production
#WORKDIR /usr/src/app
#COPY --from=build /usr/src/build-stage/package*.json ./
#COPY --from=build /usr/src/build-stage/public ./public/
#COPY --from=build /usr/src/build-stage/node_modules ./node_modules/
#COPY --from=build /usr/src/build-stage/src ./src/
## Expose the port that the application listens on.
#EXPOSE 3000
#CMD ["npm", "start"]