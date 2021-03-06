FROM node:12

# Create app directory
WORKDIR /ssrc

COPY package*.json ./
RUN npm install

COPY ./src .
CMD [ "node", "server.js" ]
