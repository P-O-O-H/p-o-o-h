FROM node:latest
RUN apt-get update -y
RUN apt-get install -y inotify-tools

WORKDIR /usr/src/app
RUN mkdir /var/pots/
COPY ./run.sh ./run.sh
COPY ./webserver/ .
COPY ./deploy-honeypot/deploy /usr/local/bin/deploy
RUN npm install
ENV PORT=8000
EXPOSE ${PORT}
CMD [ "./run.sh" ]
