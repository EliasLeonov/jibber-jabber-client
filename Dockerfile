# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install && npm install react-scripts && mkdir /jibber-jabber-front && mv ./node_modules ./jibber-jabber-front

WORKDIR /jibber-jabber-front

# add app
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]