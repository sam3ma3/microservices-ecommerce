FROM node:20
RUN mkdir -p /var/www/order
WORKDIR /var/www/order
ADD . /var/www/order
RUN npm install
CMD ["sh", "-c", "npm run build && npm run start:prod"]
