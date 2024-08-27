ARG NODE_VERSION=20.15.0
ARG NODE_ENV=production

# STAGE 1: install
FROM node:${NODE_VERSION}-alpine AS base
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/base
# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
# Copy the rest of the source files into the image.
COPY . .

# STAGE 2: build
FROM base AS build
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/build
COPY --from=base /usr/src/base ./
RUN npm run build

# STAGE 3: app
FROM node:${NODE_VERSION}-alpine AS app
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app
COPY --from=build /usr/src/build/package*.json ./
COPY --from=build /usr/src/build/public ./public/
COPY --from=build /usr/src/build/node_modules ./node_modules/
COPY --from=build /usr/src/build/src ./src/

# Expose the port that the application listens on.
EXPOSE 3000
CMD ["npm", "start"]