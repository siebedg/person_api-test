# Dockerfile for the backend

FROM node:18-alpine AS backend

WORKDIR /api

COPY api/package*.json ./

RUN npm install

COPY api/ .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]


