FROM node:15.10.0
RUN chown node:node /root
USER node
WORKDIR /usr/proj
COPY . .
USER root
RUN npm i
USER node
CMD ["npm", "start"]
