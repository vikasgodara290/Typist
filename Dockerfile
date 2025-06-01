FROM node:24-alpine

WORKDIR /app/frontend

COPY ./frontend/package.json ./package.json
COPY ./frontend/package-lock.json ./package-lock.json

COPY ./frontend .

RUN npm install

CMD ["npm", "run", "dev"]