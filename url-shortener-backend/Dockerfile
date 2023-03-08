FROM node:16

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# checking the current directory files and list with CMD
CMD ["npm","run" ,"start:dev"]

