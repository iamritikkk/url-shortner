FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm i -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]