FROM node:latest
WORKDIR /usr/src/app
COPY ./webserver/ .
COPY ./deploy-honeypot/deploy /usr/bin/deploy
RUN npm install
ENV PORT=8000
EXPOSE ${PORT}
CMD [ "npm", "start" ]
