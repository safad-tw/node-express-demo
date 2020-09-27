FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

# tell docker what port to expose
EXPOSE 8000
# start the server
CMD ["npm", "start"]
