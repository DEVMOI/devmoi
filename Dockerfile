FROM node:lts

#Creates Working App
WORKDIR /usr/app
#copy's package.json file and installs deps
COPY package.json ./
RUN npm i -g yarn truffle --quiet --unsafe-perm=true --allow-root --force
#bundles source
COPY . .
# Port App is Running on
EXPOSE 3000
CMD [ "npm", "run", "dev" ]