FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Render needs us to listen on a port, Nginx defaults to 80
EXPOSE 80
# The default nginx config listens on 80 and serves /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
