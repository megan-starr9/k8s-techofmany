FROM node:16 as builder

WORKDIR /build
COPY ./ ./
RUN npm install -g node-gyp
RUN npm install
RUN npm run build --workspaces

FROM node:16 as serve

ENV MONGODB_HOST="k8s-mongodb"
ENV MONGODB_PORT=27017
ENV MONGODB_DATABASE=techofmany

WORKDIR /var/html/www
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/@techofmany ./@techofmany

WORKDIR /var/html/www/admin
COPY --from=builder /build/admin/package*.json ./
COPY --from=builder /build/admin/dist ./dist
COPY --from=builder /build/admin/next* ./
COPY --from=builder /build/admin/tsconfig*.json ./

WORKDIR /var/html/www/site
COPY --from=builder /build/site/package*.json ./
COPY --from=builder /build/site/dist ./dist
COPY --from=builder /build/site/next* ./
COPY --from=builder /build/site/tsconfig*.json ./

WORKDIR /var/html/www
CMD [ "ls", "-a" ]
