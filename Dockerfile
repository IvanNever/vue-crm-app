FROM node:14.15.4

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]
