FROM node:18-alpine

MAINTAINER Sergio Rodríguez <sergio.rdzsg@gmail.com>

ADD . /pdn-frontend
WORKDIR /pdn-frontend

RUN npm install --force \
&& npm cache clean --force 

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
