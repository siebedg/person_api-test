# Dockerfile for the frontend

FROM node:18-alpine AS frontend

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY app/ .

CMD ["npm", "run", "dev", "--", "--host"]