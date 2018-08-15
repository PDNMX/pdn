FROM node:10-alpine

MAINTAINER Sergio Rodríguez <sergio.rdzsg@gmail.com>

ADD . /pdn
WORKDIR /pdn

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]
