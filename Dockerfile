ARG NODE_VERSION=26

# STAGE 1: build the site. Vite and the other build tools are dev dependencies, so install everything.
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /usr/src/app
COPY package*.json .npmrc ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

# STAGE 2: serve the static files with nginx under /portfolio (compression and caching: nginx/default.conf).
FROM nginx:stable-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/portfolio
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
