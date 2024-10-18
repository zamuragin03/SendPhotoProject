FROM node:20.11.0-alpine3.19
RUN apk add --no-cache tzdata
ENV TZ=Europe/Moscow
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["node", "dist/main"]