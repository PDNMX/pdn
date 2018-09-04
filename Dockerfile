FROM node:10-alpine

MAINTAINER Sergio Rodríguez <sergio.rdzsg@gmail.com>

ADD . /pdn
WORKDIR /pdn

RUN yarn add global yarn \
&& yarn install \
&& yarn build \
&& yarn global add serve \
&& yarn cache clean

EXPOSE 2000

CMD ["serve", "-s", "build"]
