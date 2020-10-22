FROM node:lts

#Creates Working App
WORKDIR /usr/app
RUN npm i -g ganache-cli
COPY . .
# Port App is Running on
EXPOSE 8545