FROM node
    
WORKDIR /app
COPY . ./
RUN npm install

ENTRYPOINT [ "npm", "start" ]
