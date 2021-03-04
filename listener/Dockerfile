FROM node:15.10.0
RUN chown node:node /root
USER node
WORKDIR /usr/proj
COPY . .
RUN npm i
CMD ["npm", "start"]
