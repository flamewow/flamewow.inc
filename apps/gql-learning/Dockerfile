FROM node:16
WORKDIR /app
COPY ./dist/apps/gql-learning .
COPY ./dist/apps/gql-learning/assets/.env.docker ./assets/.env

#make sure port is alligned with docker-compose
ENV PORT=4001 

EXPOSE ${PORT}
RUN npm install --production

CMD node ./main.js
