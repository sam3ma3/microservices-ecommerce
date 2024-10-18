FROM node:20
RUN mkdir -p /var/www/product
WORKDIR /var/www/product
ADD . /var/www/product
RUN npm install
CMD npm run build && npm run start:prod
