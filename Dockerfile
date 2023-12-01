FROM node:21.2-alpine3.18

WORKDIR /var/www

RUN yarn

CMD ["yarn", "watch"]