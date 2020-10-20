FROM node:lts

#Creates Working App
WORKDIR /usr/app
#copy's package.json file and installs deps
COPY package.json ./
RUN npm i --quiet 
RUN npm i -g jest concurrently --quiet
#bundles source
COPY . .
# Port App is Running on
EXPOSE 3000
CMD [ "npm", "run", "dev" ]