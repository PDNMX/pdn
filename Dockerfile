FROM node:18-alpine

MAINTAINER Sergio Rodríguez <sergio.rdzsg@gmail.com>

ADD . /pdn-frontend
WORKDIR /pdn-frontend

RUN npm i -g yarn --force \
&& yarn install \
&& yarn build \
&& yarn global add serve \
&& yarn cache clean

CMD ["serve", "-s", "dist", "-l", "5000"]
