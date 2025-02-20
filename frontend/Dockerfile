FROM node:20-alpine
LABEL authors="sashazhukov"

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]


