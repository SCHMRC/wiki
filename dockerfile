#stage 1
FROM node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/wiki-marco /usr/share/nginx/html
