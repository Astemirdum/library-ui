FROM node:16-alpine as build-stage


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:1.21.1-alpine as production-stage

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 ui
# USER ui

COPY default.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /app/build .

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

ENTRYPOINT ["nginx", "-g", "daemon off;"]
