# pull official base image
FROM node:latest as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install && mkdir /jibber-jabber-front && mv ./node_modules ./jibber-jabber-front

WORKDIR /jibber-jabber-front

# add app
COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /jibber-jabber-front/build /usr/share/nginx/html
COPY --from=build /jibber-jabber-front/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]