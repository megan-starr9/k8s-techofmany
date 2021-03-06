FROM node:12 as builder

COPY package*.json ./
RUN npm install
# Temporary, until we swap to typescript
COPY ./src ./dist

FROM node:12 as serve

WORKDIR /src
COPY --from=builder /package*.json ./
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /dist .
CMD [ "node", "server.js" ]
