# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node:8.9-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm cache verify
RUN npm install
RUN npm rebuild node-sass --force  
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
#COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf