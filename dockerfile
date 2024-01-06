FROM node as builder
WORKDIR /app
COPY package.json /app/
RUN npm install --force
COPY . .
RUN npm run build
ARG REACT_APP_MAPBOX_ACCESS_TOKEN
# ENV REACT_APP_MAPBOX_ACCESS_TOKEN=$REACT_APP_MAPBOX_ACCESS_TOKEN
FROM nginx:1.15
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 3000 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]