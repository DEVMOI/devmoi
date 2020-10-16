
FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g truffle --unsafe-perm=true --allow-root

ENTRYPOINT ["truffle"]