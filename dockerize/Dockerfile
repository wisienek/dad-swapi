FROM node:20-alpine as development

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./.env .

RUN yarn install

COPY . .
RUN NX_REJECT_UNKNOWN_LOCAL_CACHE=0 yarn nx run devanddeliver:build

FROM node:20-alpine as production
ENV NODE_ENV=production

USER node
WORKDIR /app

COPY --from=development /app/dist/apps/devanddeliver ./
RUN yarn install --only=production

CMD ["node", "main.js"]
