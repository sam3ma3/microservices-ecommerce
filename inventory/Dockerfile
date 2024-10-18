FROM node:20
RUN mkdir -p /var/www/inventory
WORKDIR /var/www/gateway
ADD . /var/www/gateway
RUN npm install
CMD npm run build && npm run start:prod
