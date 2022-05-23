FROM node

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 3030

CMD [ "pm2-runtime","index.js" ]
