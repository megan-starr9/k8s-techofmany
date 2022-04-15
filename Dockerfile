FROM node:16 as base
ENV PROJECT_PATH=/var/www/html/techofmany

RUN npm install -g node-gyp
RUN mkdir -p $PROJECT_PATH
WORKDIR $PROJECT_PATH

# Cache our dependencies in their own layer
FROM base as dependencies
COPY ./admin/package.json $PROJECT_PATH/admin/package.json
COPY ./site/package.json $PROJECT_PATH/site/package.json
COPY ./@techofmany $PROJECT_PATH/@techofmany
COPY ./package.json $PROJECT_PATH/package.json
RUN npm install

FROM dependencies as build
COPY ./admin $PROJECT_PATH/admin
COPY ./site $PROJECT_PATH/site
RUN npm run build --workspaces --if-present

FROM build as final
CMD [ "ls", "-a" ]
