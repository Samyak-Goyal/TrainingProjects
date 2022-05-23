FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npm install --save --react-google-login

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]
