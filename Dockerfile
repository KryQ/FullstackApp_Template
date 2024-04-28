FROM node:22.0.0-bullseye-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN apt-get update || : && apt-get install python3 -y

WORKDIR /home/node/app

COPY ./backend/package*.json ./

USER node

RUN npm ci

COPY --chown=node:node ./backend/dist .

EXPOSE 3000

CMD [ "node", "index.js" ]

