# DEPENDENCY STAGE
FROM node:slim as dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# BUILD STAGE
FROM node:slim as builder
WORKDIR /usr/src/app
COPY ./ ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npm run build

# RUN STAGE
FROM node:slim as runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/package*.json ./
ENV NODE_ENV=${NODE_ENV}
RUN npm ci --only=production
EXPOSE ${PORT}
ENTRYPOINT ["npm", "start"]
