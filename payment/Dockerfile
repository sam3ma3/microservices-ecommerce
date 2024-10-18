FROM node:20
RUN mkdir -p /var/www/payment
WORKDIR /var/www/payment
ADD . /var/www/payment
RUN npm install
CMD npm run build && npm run start:prod
