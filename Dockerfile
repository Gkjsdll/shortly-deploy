FROM node:onbuild

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

RUN npm install -g grunt

COPY . /usr/src/app

EXPOSE 4568
CMD ["npm", "start"]