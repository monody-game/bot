FROM node:alpine

WORKDIR /var/www

RUN yarn

CMD ["yarn", "watch"]