FROM node:alpine3.17

WORKDIR /usr/src/getaway-plan-react-client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Start the app
CMD ["npm", "start"]
