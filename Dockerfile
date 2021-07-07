# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH


ENV REACT_APP_URL devjibjabingsis.ddns.net

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 serve -g --silent
COPY . ./

CMD ["serve", "-s", "build", "-l", "3000"]
