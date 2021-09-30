FROM node:12 as builder

COPY . ./
RUN npm install -g node-gyp
RUN npm install
RUN npm run build

FROM node:12 as serve

ENV MONGODB_HOST="k8s-mongodb"
ENV MONGODB_PORT=27017
ENV MONGODB_DATABASE=techofmany

WORKDIR /src
COPY --from=builder /package*.json ./
COPY --from=builder /tsconfig.json ./
COPY --from=builder /next.config.js ./
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /dist ./dist
COPY --from=builder /public ./public
CMD [ "npm", "start" ]
