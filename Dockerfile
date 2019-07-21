FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -q -y && \
apt-get install -q -y vim && \
apt-get install -q -y nodejs

RUN apt-get install -q -y npm && \
npm -g install npm@latest && \
npm -g install pm2



ADD dist /datagrabber
ADD node_modules /datagrabber/node_modules/
WORKDIR /datagrabber

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT node index.js