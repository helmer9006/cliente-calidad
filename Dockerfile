FROM node:18-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./app

COPY . .

RUN npm install

COPY . /app/

RUN npm run build --prod

#SEGUNDA ETAPA

FROM nginx:1.23.1-alpine

COPY --from=build-step /app/dist/cliente /usr/share/nginx/html