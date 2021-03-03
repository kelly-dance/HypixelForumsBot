FROM node:15.10.0
RUN chown node:node /root
USER node
WORKDIR /usr/proj
COPY . .
CMD ["npm", "start"]