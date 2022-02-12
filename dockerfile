#stage 1
FROM node as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
#stage 2
FROM nginx:alpine
COPY /nginx.conf  /etc/nginx/conf.d/default.conf 
COPY --from=node /app/dist/wiki-marco /usr/share/nginx/html
