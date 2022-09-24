FROM node:14-alpine3.15 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build --prod

#SEGUNDA ETAPA

FROM nginx:1.23.1 AS prod-stage

COPY --from=build /app/dist/protocolos /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g", "daemon off;"]
