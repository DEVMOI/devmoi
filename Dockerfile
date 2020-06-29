FROM node:lts

#Creates Working App
WORKDIR /usr/app
#copy's package.json file and installs deps
COPY package.json ./
RUN npm i -g nodemon
RUN npm i --quiet 

#bundles source
COPY . .
# Port App is Running on
EXPOSE 3000
CMD [ "npm", "run", "dev" ]