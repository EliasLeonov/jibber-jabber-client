# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


ENV REACT_APP_URL devjibjabingsis.ddns.net

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install -g react-scripts

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "run", "start"]