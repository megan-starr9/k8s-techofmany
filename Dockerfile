FROM node:12 as builder

COPY . ./
RUN npm install
RUN npm run build

FROM node:12 as serve

WORKDIR /src
COPY --from=builder /package*.json ./
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /.next ./.next
COPY --from=builder /public ./public
CMD [ "npm", "start" ]
